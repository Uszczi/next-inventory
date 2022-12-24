import * as fs from "fs";
import * as path from "path";
import { PrismaClient } from "@prisma/client";
import moment from "moment";

const regExpression = new RegExp(
  "(?<title>.*) \\((?<productionYear>.*)\\) \\*\\*(?<directors>.*)\\*\\*"
);

function processFile(path: string) {
  const contents = fs.readFileSync(path, "utf8");
  const lines = contents.split("\n").filter((v) => v);
  let allValidMovies = true;
  let movies = [];

  let year: RegExpMatchArray | string | null = path.match(
    new RegExp("(\\d{4})")
  );
  if (year) {
    year = year[0];
  }

  let watchDay = moment(year);
  let days = 365;
  if (watchDay.isLeapYear()) {
    days = 366;
  }
  const avg_delay = (days / lines.length).toFixed();

  for (let index in lines) {
    const line = lines[index];
    console.log(watchDay.format());
    const movie = processLine(line, watchDay.format());
    if (movie) {
      movies.push(movie);
      watchDay = watchDay.add(avg_delay, "days");
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

function processLine(line: string, watchDate: string) {
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
    watch_date: watchDate,
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

    const prisma = new PrismaClient();
    const result = await prisma.movie.createMany({ data: movies });
    console.log(`${result.count} movies added to database\n`);
  }
  console.log(`Total added movies : ${total}`);
}
main();

export {};
