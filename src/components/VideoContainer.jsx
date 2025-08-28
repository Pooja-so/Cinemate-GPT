import React from "react";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoInfo from "./VideoInfo";

const VideoContainer = () => {
  const movies = useSelector((state) => state.movie?.nowPlayingMovies);
  if (!movies) return; // Early return: as in starting nowPlayingMovies will contain null

  const mainMovie = movies[0];
  console.log("Main movie information: ", mainMovie);

  return (
    <div>
      <VideoInfo movieInfo={mainMovie} />
      <VideoBackground />
    </div>
  );
};

export default VideoContainer;
