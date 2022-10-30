import FzfMoviesTable from "../../components/FzfMoviesTable";
import { PrismaClient } from "@prisma/client";

export default async function MoviesList() {
  const prisma = new PrismaClient();
  const toDisplay = await prisma.movie.findMany();
  console.log(toDisplay);

  return (
    <div className="flex justify-center overflow-y-scroll        h-[92vh]">
      <FzfMoviesTable elements={toDisplay} />
    </div>
  );
}
