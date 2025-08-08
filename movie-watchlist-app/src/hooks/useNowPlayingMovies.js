import { useState, useEffect, useRef } from "react";
import { fetchNowPlayingMovies } from "../utils/api/tmdb";

export function useNowPlayingMovies(page = 1) {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(true);

  const cacheRef = useRef({});

  useEffect(() => {
    async function loadMovies() {
      if (cacheRef.current[page]) {
        setMovies(cacheRef.current[page]);
        setLoading(false);
        return;
      }

      const data = await fetchNowPlayingMovies(page);
      const { results, total_pages } = data;

      setMovies(results);
      cacheRef.current[page] = results;
      setTotalPages(total_pages);

      setLoading(false);
    }
    loadMovies();
  }, [page]);

  return { movies, totalPages, loading };
}
