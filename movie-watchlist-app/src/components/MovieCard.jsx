import React from "react";

const MovieCard = ({movie}) => {
    const { title, poster_path, vote_average } = movie
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
      </div>
    </li>
  );
};

export default MovieCard;
