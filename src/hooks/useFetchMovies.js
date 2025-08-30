import { useState, useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
/**
 * Custom hook to fetch "all" movies from TMDB
 * - Dispatches results to Redux
 * - Returns loading and error state for UI handling
 */
// Inside custom hook → useEffect is needed (because fetching is a side effect).
// Inside Browse Component → no useEffect needed, because Browse just consumes the hook’s results.

const useFetchMovies = (url, action, dispatch) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url, API_OPTIONS);
        const data = await response.json();
        dispatch(action(data.results || []));
      } catch (error) {
        console.error("Error while fetching movies. ", error.message);
        setErrorMessage("Check your internet connection");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [dispatch, action, url]);

  return { isLoading, errorMessage };
};

export default useFetchMovies;
