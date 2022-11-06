import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  if (req.method === "POST") {
    await prisma.testCounter.updateMany({ data: { value: { increment: 1 } } });
  }

  let counter = await prisma.testCounter.findFirst();
  if (!counter) {
    counter = await prisma.testCounter.create({ data: { value: 1 } });
  }

  res.status(200).json({ value: counter.value });
}
