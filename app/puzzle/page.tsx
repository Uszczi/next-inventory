import { PrismaClient } from "@prisma/client";
import moment from "moment";

const CURRECT_PUZZLE_ID = 2;

export default async function Puzzle() {
  const prisma = new PrismaClient();
  const toDisplay = await prisma.puzzle.findFirst({
    where: { id: CURRECT_PUZZLE_ID },
    select: { entries: true },
  });

  // TODO add start button
  // TODO add stop button
  // TODO add total time

  return (
    <div className="flex h-[92vh]  flex-col items-center ">
      <div className="grid w-[500px] grid-cols-[20px_150px_150px_70px]">
        <div> </div>
        <div>Start</div>
        <div>End</div>
        <div>Time</div>
      </div>

      {toDisplay?.entries.map((e, i) => {
        return (
          <div className="grid w-[500px] grid-cols-[20px_150px_150px_70px]">
            <div>{i + 1}. </div>
            <div>{moment(e.start).format("HH:MM  DD/MM/YYYY")}</div>
            <div>{moment(e.end).format("HH:MM  DD/MM/YYYY")}</div>
            <div>{moment(e.end).diff(moment(e.start), "minutes")}</div>
          </div>
        );
      })}
      <button>Start</button>
      <button>Stop</button>
    </div>
  );
}
