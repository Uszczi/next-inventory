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
      limit: 25,
      casing: "case-insensitive",
      selector: (item) => item.title,
    });
    setFzf(fzf);
  }, [elements]);

  return (
    <div className="w-[800px] max-w-[800px]">
      <div className="mb-4 mt-7">
        <div className="relative h-10 w-full">
          <input
            className="text-blue-gray-700 disabled:bg-blue-gray-50 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border-blue-gray-200 peer h-full w-full rounded-[7px] border bg-transparent px-3 py-2.5 font-sans text-sm font-normal outline  outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0"
            placeholder=" "
            onChange={handleInput}
          />
          <label className="peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 before:content[' '] after:content[' '] text-blue-gray-400 before:border-blue-gray-200 after:border-blue-gray-200 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent">
            Start typing ...
          </label>
        </div>
      </div>
      {toDisplay.map((element, i) => {
        return (
          <div
            key={i}
            className="mb-5 flex items-center gap-1 p-4 px-1 shadow-md md:gap-3"
          >
            <div className="flex h-8 w-8 min-w-[32px] items-center justify-center rounded-full bg-black text-white">
              {i + 1}
            </div>
            <HighlightChars
              str={element.item.title}
              positions={element.positions}
              onClick={() => {}}
            />
            <p className="font-bold">{element.item.directors}</p>
            <p className="ml-auto hidden shrink-0">{element.item.watch_date}</p>
          </div>
        );
      })}
    </div>
  );
}
