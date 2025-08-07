import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, watchlist, toggleWatchlist }) => {
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isInWatchlist={watchlist.includes(movie.id)}
          toggleWatchlist={toggleWatchlist}
        />
      ))}
    </ul>
  );
};

export default MovieList;
