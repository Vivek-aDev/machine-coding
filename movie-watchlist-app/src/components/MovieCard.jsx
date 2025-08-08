import React from "react";
import WatchlistButton from "./WatchlistButton";
import { IMG_BASE } from "../utils/constants";

const MovieCard = ({ movie, isInWatchlist, toggleWatchlist }) => {
  const { id, title, poster_path, vote_average } = movie;
  return (
    <li className="movie-item">
      <img
        src={IMG_BASE + poster_path}
        alt={title}
        className="movie-poster"
        loading="lazy"
      />
      <div>
        <h3>{title}</h3>
        <p>Rating: {vote_average}</p>
        <WatchlistButton
          isInWatchlist={isInWatchlist}
          toggleWatchlist={() => toggleWatchlist(id)}
        />
      </div>
    </li>
  );
};

export default MovieCard;
