import { useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import FilterDropdown from "./components/FilterDropdown";
import SearchBar from "./components/SearchBar";
import { useNowPlayingMovies } from "./hooks/useNowPlayingMovies";
import MovieModal from "./components/modal/MovieModal";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const { movies, loading } = useNowPlayingMovies();

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
        onSelectedMovie={setSelectedMovie}
      />
      {
        selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={()=>setSelectedMovie(null)} />
        )
      }
    </div>
  );
}

export default App;
