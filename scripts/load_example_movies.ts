// ts-node -O '{"module": "commonjs"}' scripts/load_example_movies.ts
import movies from "../example_data/movies";
import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();
  movies.forEach(async (movie) => {
    await prisma.movie.create({
      data: movie,
    });
  });
}

main();
