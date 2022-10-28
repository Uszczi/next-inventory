// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import MoviesService, { Movie } from "../services/movies";
// import "./MoviesTable.css";
//
// import { Fzf, FzfResultItem } from "fzf";
// import { useDispatch, useSelector } from "react-redux";
// import { set as moviesStoreSet } from "../store/reducers/movies";
//
// const HighlightChars = (props: {
//   str: string;
//   positions: Set<number>;
//   onClick: any;
// }) => {
//   const chars = props.str.split("");
//
//   const nodes = chars.map((char, i) => {
//     if (props.positions.has(i)) {
//       return <span key={i}>{char}</span>;
//     } else {
//       return char;
//     }
//   });
//
//   return <p onClick={props.onClick}>{nodes}</p>;
// };
//

export default async function MoviesList() {
  // const movies: Movie[] = useSelector(
  //   (state: { movies: { value: Movie[] } }) => state.movies.value
  // async function getMovies() {
  //   console.log("running");
  //   return await fetch("https://mateuszpapuga.pl/api/movies", {
  //     cache: "no-store",
  //   });
  // }
  async function getMovies() {
    console.log("running");
    return await fetch("https://mateuszpapuga.pl/api/movies");
  }
  // );
  // const dispatch = useDispatch();
  //
  const movies_response = await getMovies();
  let toDisplay = await movies_response.json();
  // toDisplay = toDisplay.slice(0, 100);
  // const toDisplay = [];
  // const toDisplay = [
  //   {
  //     directors: "Lana Wachowski, Lilly Wachowski",
  //     id: "6329d3f87cb475833c0b2322",
  //     production_year: "1999",
  //     title: "Matrix",
  //     watch_date: "2021-01-01",
  //   },
  // ];
  // const [fzf, setFzf] = useState({} as Fzf<Movie[]>);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (movies.length > 0) {
  //     const allFzf = new Fzf(movies, {
  //       fuzzy: "v1",
  //       selector: (item) => item.title,
  //     });
  //     const allItems = allFzf.find("");
  //     setToDisplay(allItems);
  //
  //     const fzf = new Fzf(movies, {
  //       limit: 22,
  //       casing: "case-insensitive",
  //       selector: (item) => item.title,
  //     });
  //     setFzf(fzf);
  //   } else {
  //     MoviesService.getMovies().then((movies) =>
  //       dispatch(moviesStoreSet(movies))
  //     );
  //   }
  // }, [movies]);
  //
  // function handleInput(e: React.FormEvent<HTMLInputElement>) {
  //   const result = fzf.find(e.currentTarget.value);
  //   setToDisplay(result);
  // }

  return (
    <div className="MoviesList">
      <input placeholder="Start typing..." />
      {toDisplay.map((element, i) => {
        return (
          <div key={i} className="card">
            <div>{i + 1}</div>
            <div>
              <p>{element.title}</p>
              <p>{element.title}</p>
              <p>{element.directors}</p>
            </div>
            <div>{element.watch_date}</div>
          </div>
        );
      })}
    </div>
  );
}
