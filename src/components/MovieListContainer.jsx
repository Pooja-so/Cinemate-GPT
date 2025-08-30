import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const MovieListContainer = () => {
  const movies = useSelector((state) => state.movies);

  return (
    /* 3 MovieList -
      Category: Popular, NowPlaying, Trending 
      Each category has multiple movie cards.
    */
    <div className="bg-black">
      <div className="w-full h-full flex flex-col gap-3 py-5">
        <MovieList movies={movies?.nowPlayingMovies} category={"Now Playing"} />
        <MovieList movies={movies?.popularMovies} category={"Popular"} />
        <MovieList movies={movies?.upcomingMovies} category={"Upcoming"} />
        <MovieList movies={movies?.topRatedMovies} category={"Top Rated"} />
      </div>
    </div>
  );
};

export default MovieListContainer;
