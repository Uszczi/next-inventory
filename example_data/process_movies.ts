import * as fs from "fs";
import * as path from "path";
import { PrismaClient } from "@prisma/client";

const regExpression = new RegExp(
  "(?<title>.*) \\((?<productionYear>.*)\\) \\*\\*(?<directors>.*)\\*\\*"
);
const prisma = new PrismaClient();

function processFile(path: string) {
  const contents = fs.readFileSync(path, "utf8");
  const lines = contents.split("\n").filter((v) => v);
  let allValidMovies = true;
  let movies = [];

  for (let index in lines) {
    const line = lines[index];
    const movie = processLine(line);
    if (movie) {
      movies.push(movie);
    } else {
      console.error(`Error at line ${+index + 1}`);
      console.error(`Line: ${line} \n`);
      allValidMovies = false;
    }
  }

  if (allValidMovies) {
    return movies;
  } else {
    throw Error("Cannot fully process the file.");
  }
}

function processLine(line: string) {
  const values = line.match(regExpression);
  const title = values?.groups?.title;
  const productionYear = values?.groups?.productionYear;
  const directors = values?.groups?.directors;
  if (!title || !productionYear || !directors) {
    return false;
  }
  return {
    title,
    production_year: +productionYear,
    directors,
    watch_date: "2012_12_12",
  };
}

async function main() {
  let total = 0;
  for (let file of [
    "./movies_2017.txt",
    "./movies_2018.txt",
    "./movies_2019.txt",
    "./movies_2020.txt",
    "./movies_2021.txt",
    "./movies_2022.txt",
  ]) {
    const movies = processFile(path.join(__dirname, file));
    total += movies.length;

    console.log(`Parsed ${movies.length} from ${file}`);

    const result = await prisma.movie.createMany({ data: movies });
    console.log(`${result.count} movies added to database\n`);
  }
  console.log(`Total added movies : ${total}`);
}
main();

export {};
