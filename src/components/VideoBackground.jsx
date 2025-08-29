import { useSelector } from "react-redux";
import useFetchMovieTrailer from "../hooks/useFetchMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const { isLoading } = useFetchMovieTrailer(movieId);
  const movieTrailer = useSelector((state) => state.movies?.movieTrailer);
  if (!movieTrailer) return; // Early return, Intially movieTrailer will be null during fetching process

  const videoClipURL = `https://www.youtube.com/embed/${movieTrailer?.key}?si=cktsufjBvMCZG6wO&autoplay=1&mute=1`;

  if (isLoading) return <p>Loading movies...</p>;

  return (
    <div className= "w-full h-full flex justify-center items-center">
      <iframe
        src={videoClipURL}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        className="w-full h-full rounded-xl"
      ></iframe>

    </div>
  );
};

export default VideoBackground;
