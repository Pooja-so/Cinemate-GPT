import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../store/movieSlice";
import { API_OPTIONS } from "../utils/constants";

/**
 * Custom hook to fetch "Now Playing" movies from TMDB
 * - Dispatches results to Redux
 * - Returns loading and error state for UI handling
 */
// Inside custom hook → useEffect is needed (because fetching is a side effect).
// Inside Browse Component → no useEffect needed, because Browse just consumes the hook’s results.
const useFetchNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?page=1",
          API_OPTIONS
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        // dispatch results to Redux; ensure we pass an array (fallback to empty array)
        dispatch(addNowPlayingMovies(data.results || []));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNowPlayingMovies();
  }, [dispatch]);

  return { isLoading, error };
};

export default useFetchNowPlayingMovies;
