import { useDispatch } from "react-redux";
import {
  addNowPlayingMovies,
  addPopularMovies,
  addUpcomingMovies,
  addTopRatedMovies,
} from "../store/movieSlice";
import useFetchMovies from "./useFetchMovies";
import { toast } from "react-toastify";

const useFetchAllMovies = () => {
  const dispatch = useDispatch();

  const { isLoading: topRatedLoading, errorMessage: topRatedError } = useFetchMovies(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    addTopRatedMovies,
    dispatch
  );

  const { isLoading: nowPlayingLoading, errorMessage: nowPlayingError } =
    useFetchMovies(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      addNowPlayingMovies,
      dispatch
    );

  const { isLoading: popularLoading, errorMessage: popularError } = useFetchMovies(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    addPopularMovies,
    dispatch
  );

  const { isLoading: upcomingLoading, errorMessage: upcomingError } = useFetchMovies(
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
    addUpcomingMovies,
    dispatch
  );

  if (nowPlayingError || topRatedError || upcomingError || popularError) {
    toast.errorMessage(nowPlayingError);
  }
    return {
      isLoadingAny:
        topRatedLoading ||
        nowPlayingLoading ||
        popularLoading ||
        upcomingLoading,
    };
};

export default useFetchAllMovies;
