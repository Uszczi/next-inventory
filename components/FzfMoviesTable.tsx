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
    <div className="max-w-[800px]">
      <div className="mb-4 mt-7">
        <div className="relative w-full  h-10">
          <input
            className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2  focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
            placeholder=" "
            onChange={handleInput}
          />
          <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">
            Start typing ...
          </label>
        </div>
      </div>
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
            <p className="ml-auto shrink-0">{element.item.watch_date}</p>
          </div>
        );
      })}
    </div>
  );
}
