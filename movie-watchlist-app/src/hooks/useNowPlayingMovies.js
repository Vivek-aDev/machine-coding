import { useState, useEffect } from "react";
import { fetchNowPlayingMovies } from "../utils/api/tmdb";

export function useNowPlayingMovies(page=1) {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      const data = await fetchNowPlayingMovies(page);
      const { results, total_pages } = data;

      setMovies(results);
      setTotalPages(total_pages);

      setLoading(false);
    }
    loadMovies();
  }, [page]);

  return { movies, totalPages, loading };
}
