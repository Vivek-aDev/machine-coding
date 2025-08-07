import { useState, useEffect } from "react";
import { fetchNowPlayingMovies } from "../utils/api/tmdb";

export function useNowPlayingMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      const data = await fetchNowPlayingMovies();
      setMovies(data);
      setLoading(false);
    }
    loadMovies();
  }, []);

  return { movies, loading };
}
