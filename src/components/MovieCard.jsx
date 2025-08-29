import { TMDB_IMAGE_URL } from "../utils/constants";

const MovieCard = ({ movie }) => {
  const { title, poster_path, overview, vote_average, release_date } = movie;
  const image_url = TMDB_IMAGE_URL + poster_path;
  return (
    <div className="w-35 flex-shrink-0">
      <img
        src={image_url}
        alt={title}
        className="w-full h-45 object-cover rounded-sm"
      />
    </div>
  );
};
export default MovieCard;
