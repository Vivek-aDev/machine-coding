import { useState, useEffect } from "react";
import { fetchNowPlayingMovies } from "./api/tmdb";
import "./App.css";
import MovieList from "./components/MovieList";
import FilterDropdown from "./components/FilterDropdown";
import SearchBar from "./components/SearchBar";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist"));
    if (savedWatchlist) {
      setWatchlist(savedWatchlist);
    }

    async function getMovies() {
      const data = await fetchNowPlayingMovies();
      setMovies(data);
      setLoading(false);
    }
    getMovies();
  }, []);

  const toggleWatchlist = (movieId) => {
    setWatchlist((prevWatchlist) => {
      const updated = prevWatchlist.includes(movieId)
        ? prevWatchlist.filter((id) => id !== movieId)
        : [...prevWatchlist, movieId];

      localStorage.setItem("watchlist", JSON.stringify(updated));
      return updated;
    });
  };

  const filteredMovies = movies
    .filter((movie) =>
      filter === "watchlist" ? watchlist.includes(movie.id) : true
    )
    .filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (loading) return <p>Loading movies...</p>;

  return (
    <div className="app">
      <h1>Now Playing 🎬</h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
