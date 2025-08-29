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
    <div className="flex flex-col justify-center px-5 py-4 text-justify font-serif">
      <h1 className="text-3xl font-bold text-red-600">{title}</h1>
      <p className="text-lg text-gray-300 tracking-wide py-3">
        {overview}
      </p>

      <div className="flex gap-6">
        <button
          className="bg-white w-1/4 px-5 py-1.5 flex gap-2 text-xl items-center rounded-sm cursor-pointer
          hover:opacity-50 active:bg-white/80 active:scale-95 transition-all duration-150"
        >
          <Play size={18} fill="black" />
          Play
        </button>
        <div className="relative w-3/4">
          {showMoreInfo && (
            <div
              className="absolute top-10 w-7/8 z-10 p-4 rounded-lg text-left 
              border border-red-400/30 bg-red-950/40 text-amber-200 tracking-wide"
            >
              <p>
                Release Date: {formattedDate}
              </p>
              <p>
                Language: {original_language === "en" ? "English" : original_language}
              </p>
              <p>
                Genres: {genres}
              </p>
              <p>
                Rating: {vote_average.toFixed(1)} / 10
              </p>
            </div>
          )}
          <div
            className="w-3/6 px-3 py-1.5 text-xl flex items-center gap-2  text-white rounded-sm cursor-pointer
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
