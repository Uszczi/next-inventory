import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();

  await prisma.puzzle.create({
    data: {
      name: "something",
      pieces: 3000,
      entries: {
        create: [
          {
            start: new Date(2022, 10, 31, 23, 10),
            end: new Date(2022, 10, 31, 23, 10),
          },

          {
            start: new Date(2022, 11, 1, 11, 10),
            end: new Date(2022, 11, 1, 11, 40),
          },

          {
            start: new Date(2022, 11, 1, 15, 10),
            end: new Date(2022, 11, 1, 16, 20),
          },
        ],
      },
    },
    // include: { entries: true },
  });
}

main();
