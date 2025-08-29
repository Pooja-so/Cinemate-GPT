import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addMovieTrailer } from "../store/movieSlice";
import { API_OPTIONS } from "../utils/constants";
import { toast } from "react-toastify";

/**
 * Custom hook to fetch "Movie Trailer" from TMDB
 * - Dispatches results to Redux (Storing movie trailer)
 * - Returns loading and error state for UI handling
 */
// Inside custom hook → useEffect is needed (because fetching is a side effect).
// Inside VideoBackground Component → no useEffect needed, because it just consumes the hook’s results.
const useFetchMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovieTrailer = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          API_OPTIONS
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        const videos = data.results; // An array of objects containing videos
        const trailers = videos.filter((video) => video.type === "Trailer"); // An array of Trailer video objects
        const movieTrailer = trailers.length ? trailers[0] : videos[0]; // If no tariler video exists then we will take first available video

        // Store movie trailer in redux
        dispatch(addMovieTrailer(movieTrailer));
      } catch (error) {
        console.log("Error while fetching Movie Trailer: ", error.message);
        toast.error("Check your internet connection..");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieTrailer();
  }, [movieId, dispatch]);

  return { isLoading };
};

export default useFetchMovieTrailer;
