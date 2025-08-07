import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({
  movies,
  watchlist,
  toggleWatchlist,
  onSelectedMovie,
}) => {
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <div key={movie.id} onClick={() => onSelectedMovie(movie)}>
          <MovieCard
            movie={movie}
            isInWatchlist={watchlist.includes(movie.id)}
            toggleWatchlist={toggleWatchlist}
          />
        </div>
      ))}
    </ul>
  );
};

export default MovieList;
