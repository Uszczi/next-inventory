import FzfMoviesTable from "../../components/FzfMoviesTable";

export interface Movie {
  directors: string;
  id: string;
  production_year: string;
  title: string;
  watch_date: string;
}

async function getMovies(): Promise<Movie[]> {
  const response = await fetch("https://mateuszpapuga.pl/api/movies");
  return await response.json();
}
export default async function MoviesList() {
  let toDisplay = await getMovies();

  return (
    <div className="flex justify-center overflow-y-scroll        h-[92vh]">
      <FzfMoviesTable elements={toDisplay} />
    </div>
  );
}
