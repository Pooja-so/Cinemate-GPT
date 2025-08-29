import useFetchNowPlayingMovies from "../hooks/useFetchNowPlayingMovies";
import Header from "./Header";
import VideoContainer from "./VideoContainer";
import MovieListContainer from "./MovieListContainer";

const Browse = () => {
  const { isLoading } = useFetchNowPlayingMovies();

  if (isLoading) return <p>Loading movies...</p>;

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
