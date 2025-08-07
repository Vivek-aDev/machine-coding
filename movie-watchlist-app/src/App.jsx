import { useState, useEffect } from "react";
import { fetchNowPlayingMovies } from "./api/tmdb";
import "./App.css";
import MovieList from "./components/MovieList";
import FilterDropdown from "./components/FilterDropdown";

function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMovies() {
      const data = await fetchNowPlayingMovies();
      setMovies(data);
      setLoading(false);
    }
    getMovies();
  }, []);

  const toggleWatchlist = (movieId) => {
    setWatchlist((prevWatchlist) =>
      prevWatchlist.includes(movieId)
        ? prevWatchlist.filter((id) => id !== movieId)
        : [...prevWatchlist, movieId]
    );
  };

  const filteredMovies =
    filter === "watchlist"
      ? movies.filter((movie) => watchlist.includes(movie.id))
      : movies;

  if (loading) return <p>Loading movies...</p>;

  return (
    <div className="app">
      <h1>Now Playing 🎬</h1>
      <FilterDropdown filter={filter} setFilter={setFilter} />
      <MovieList
        movies={filteredMovies}
        watchlist={watchlist}
        toggleWatchlist={toggleWatchlist}
      />
    </div>
  );
}

export default App;
