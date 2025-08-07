import { useState, useEffect } from "react";
import { fetchNowPlayingMovies } from "./api/tmdb";
import "./App.css";
import MovieList from "./components/MovieList";

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
      <MovieList movies={movies} />
    </div>
  );
}

export default App;
