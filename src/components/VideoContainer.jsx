import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoInfo from "./VideoInfo";

const VideoContainer = () => {
  const movies = useSelector((state) => state.movies?.nowPlayingMovies);
  if (!movies) return; // Early return: as in starting nowPlayingMovies will contain null

  const mainMovie = movies[0];
  // console.log("Main movie information: ", mainMovie);

  return (
    <div className="h-9/10 flex justify-center items-center bg-black/90 relative">
      <img
        src="Theatre.jpeg"
        alt="Theatre"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      <div className="flex w-full h-full p-5">
        <div className="w-3/5 h-4/5 pt-5 self-center">
          <VideoBackground movieId={mainMovie.id} />
        </div>
        <div className="w-2/5 pl-4 self-center">
          <VideoInfo movieInfo={mainMovie} />
        </div>
      </div>
    </div>
  );
};

export default VideoContainer;
