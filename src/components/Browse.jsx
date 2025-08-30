import Header from "./Header";
import VideoContainer from "./VideoContainer";
import MovieListContainer from "./MovieListContainer";
import useFetchAllMovies from "../hooks/useFetchAllMovies";

const Browse = () => {
  const { isLoadingAny } = useFetchAllMovies();
  if (isLoadingAny) return <p>Loading all movies..</p>;

  //TODO: return isLoadingAny ? <Loader /> : <MoviesDashboard />;

  return (
    <div className="h-screen overflow-y-auto scrollbar-hide">
      <Header />
      {/*  Two sections:
          1. MainContainer
            - Video clip palying in the Background
            - Video info (title)
          2. Secondary Container
            - Movie list * n
              -- movie card * n
      */}
      <VideoContainer />
      <MovieListContainer />
    </div>
  );
};

export default Browse;
