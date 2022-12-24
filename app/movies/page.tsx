import FzfMoviesTable, { MovieDisplay } from "../../components/FzfMoviesTable";
import { PrismaClient } from "@prisma/client";

export default async function MoviesList() {
  const prisma = new PrismaClient();
  let toDisplay: any[] = await prisma.movie.findMany();

  for (let index in toDisplay) {
    toDisplay[index] = { ...toDisplay[index], displayNumber: +index + 1 };
  }
  toDisplay = toDisplay.reverse();

  return (
    <div className="flex h-[92vh] justify-center overflow-y-scroll">
      <FzfMoviesTable elements={toDisplay} />
    </div>
  );
}
