import { useState, useEffect } from "react";
import { fetchNowPlayingMovies } from "./api/tmdb";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMovies() {
      const data = await fetchNowPlayingMovies();
      setMovies(data);
      setLoading(false);
    }
    getMovies();
  }, []);

  if (loading) return <p>Loading movies...</p>;

  return (
    <div className="app">
      <h1>Now Playing 🎬</h1>
      <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie.id} className="movie-item">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <div>
              <h3>{movie.title}</h3>
              <p>Rating: {movie.vote_average}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
