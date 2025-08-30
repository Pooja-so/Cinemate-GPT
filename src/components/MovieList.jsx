import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, category }) => {
  if (!movies) return; // movies will be null during initial rendering
  console.log("Movies: ", movies);

  return (
    movies && (
      <div className="flex flex-col space-y-3">
        <h1 className="text-xl px-3 font-serif font-semibold text-red-700">
          {category}
        </h1>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide px-2">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    )
  );
};

export default MovieList;
