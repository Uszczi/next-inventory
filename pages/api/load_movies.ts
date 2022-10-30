import type { NextApiRequest, NextApiResponse } from "next";
import movies from "../../example_data/movies";
import { PrismaClient } from "@prisma/client";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
  movies.forEach(async (movie) => {
    await prisma.movie.create({
      data: movie,
    });
  });
  res.status(200).json({ OK: "OK" });
}
