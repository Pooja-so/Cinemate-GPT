import { useState } from "react";
import { genreMap } from "../utils/constants";
import { Play, Info } from "lucide-react";

const VideoInfo = ({ movieInfo }) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const {
    title,
    overview,
    release_date,
    original_language,
    genre_ids,
    vote_average,
  } = movieInfo;

  const genres = genre_ids?.map((id) => genreMap[id]).join(",  ") || "N/A";
  const formattedDate = new Date(release_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="absolute w-4/6 top-1/2 left-7 px-5 py-4 text-justify font-serif">
      <h1 className="text-3xl font-bold">{title}</h1>

      <p className="text-lg text-gray-300 font-normal tracking-wide py-3">
        {overview}
      </p>
      <div className="flex gap-6 text-xl">
        <button
          className="bg-white px-5 py-1.5 flex gap-2  items-center rounded-sm cursor-pointer
         active:bg-white/80 active:scale-95 transition-all duration-150"
        >
          <Play size={18} fill="black" />
          Play
        </button>
        <div>
          {showMoreInfo && (
            <div
              className="absolute z-6 bottom-10 left-1/4 p-2 text-lg tracking-normal rounded-lg
           text-black bg-white/20 backdrop-blur-sm border-white/30 font-serif "
            >
              <p>
                <b>Release Date: </b> {formattedDate}
              </p>
              <p>
                <b>Language: </b>
                {original_language === "en" ? "English" : original_language}
              </p>
              <p>
                <b> Genres: </b> {genres}
              </p>
              <p>
                <b>Rating: </b> {vote_average.toFixed(1)} / 10
              </p>
            </div>
          )}
          <div
            className="px-3 py-1.5 flex items-center gap-2  text-white rounded-sm cursor-pointer
          bg-white/25 backdrop-blur-md hover:bg-white/40 transition-all duration-150"
            onMouseOver={() => setShowMoreInfo(true)}
            onMouseOut={() => setShowMoreInfo(false)}
          >
            <Info size={20} />
            More Info
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;
