import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  if (req.method === "GET") {
    const timeEntry = await prisma.puzzleTimeEntry.findFirst({
      where: { end: null },
    });

    if (!timeEntry) {
      res.status(200).json({ status: "NO_RUNNING" });
    } else {
      res.status(200).json({ status: "RUNNING", start: timeEntry.start });
    }
  } else {
    if ("start" in req.query && "stop" in req.query) {
      res.status(400).json({ msg: "Only one action" });
      return;
    }

    if ("start" in req.query) {
      const timeEntry = await prisma.puzzleTimeEntry.findFirst({
        where: { end: null },
      });
      if (timeEntry) {
        res.status(200).json({ status: "RUNNING", start: timeEntry.start });
        return;
      }

      const newEntry = await prisma.puzzleTimeEntry.create({
        data: { puzzleId: 1 },
      });

      res.status(200).json({ status: "CREATED", start: newEntry.start });
    } else if ("stop" in req.query) {
      const timeEntry = await prisma.puzzleTimeEntry.findFirst({
        where: { end: null },
      });
      if (!timeEntry) {
        res.status(400).json({ status: "no timer is currently runnning" });
        return;
      }

      const updated = await prisma.puzzleTimeEntry.update({
        where: { id: timeEntry.id },
        data: { end: new Date() },
      });

      res
        .status(200)
        .json({ status: "stop", start: updated.start, end: updated.end });
    } else {
      res.status(400).json({ status: "bad request" });
    }
  }
}
