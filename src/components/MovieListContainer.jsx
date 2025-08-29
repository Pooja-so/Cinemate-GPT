import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const MovieListContainer = () => {
  const nowPlayingMovies = useSelector(
    (state) => state.movies?.nowPlayingMovies
  );

  return (
    /* 3 MovieList -
      Category: Popular, NowPlaying, Trending 
      Each category has multiple movie cards.
    */
    <div className="bg-black">
      <div className="w-full h-full flex flex-col gap-3 py-5">
        <MovieList movies={nowPlayingMovies} category={"Now Playing"} />
        <MovieList movies={nowPlayingMovies} category={"Popular"} />
        <MovieList movies={nowPlayingMovies} category={"Trending"} />
      </div>
    </div>
  );
};

export default MovieListContainer;
