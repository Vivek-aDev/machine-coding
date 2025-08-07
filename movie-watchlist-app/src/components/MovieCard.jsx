import React from "react";
import WatchlistButton from "./WatchlistButton";

const MovieCard = ({ movie, isInWatchlist, toggleWatchlist }) => {
  const { id, title, poster_path, vote_average } = movie;
  return (
    <li className="movie-item">
      <img
        src={`https://image.tmdb.org/t/p/w200${poster_path}`}
        alt={title}
        className="movie-poster"
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
