"use client";

import type { Movie } from "@prisma/client";
import { Fzf, FzfResultItem } from "fzf";
import { useEffect, useState } from "react";

const HighlightChars = (props: {
  str: string;
  positions: Set<number>;
  onClick: any;
}) => {
  const chars = props.str.split("");

  const nodes = chars.map((char, i) => {
    if (props.positions.has(i)) {
      return (
        <span className="text-amber-500" key={i}>
          {char}
        </span>
      );
    } else {
      return char;
    }
  });

  return <p onClick={props.onClick}>{nodes}</p>;
};

export default function FzfMoviesTable({ elements }: { elements: Movie[] }) {
  const [fzf, setFzf] = useState({} as Fzf<Movie[]>);
  const [toDisplay, setToDisplay] = useState([] as FzfResultItem<Movie>[]);

  function handleInput(e: React.FormEvent<HTMLInputElement>) {
    const result = fzf.find(e.currentTarget.value);
    setToDisplay(result);
  }

  useEffect(() => {
    if (elements.length > 0) {
      const allFzf = new Fzf(elements, {
        fuzzy: "v1",
        selector: (item) => item.title,
      });
      const allItems = allFzf.find("");
      setToDisplay(allItems);
    }

    const fzf = new Fzf(elements, {
      limit: 22,
      casing: "case-insensitive",
      selector: (item) => item.title,
    });
    setFzf(fzf);
  }, []);

  return (
    <div className="" style={{ width: "700px" }}>
      <input placeholder="Start typing..." onChange={handleInput} />
      {toDisplay.map((element, i) => {
        return (
          <div key={i} className="flex shadow-md mb-5 p-4 items-center gap-3">
            <div className="bg-black w-8 h-8 text-white rounded-full flex items-center justify-center">
              {i + 1}
            </div>
            <HighlightChars
              str={element.item.title}
              positions={element.positions}
              onClick={() => {}}
            />
            <p className="font-bold">{element.item.directors}</p>
            <p className="ml-auto">{element.item.watch_date}</p>
          </div>
        );
      })}
    </div>
  );
}
