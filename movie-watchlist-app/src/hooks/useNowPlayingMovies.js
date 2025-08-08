import { useState, useEffect, useRef } from "react";
import { fetchNowPlayingMovies } from "../utils/api/tmdb";

const CACHE_KEY = "movie_page_cache";

export function useNowPlayingMovies(page = 1) {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(true);

  const cacheRef = useRef({});

  useEffect(() => {
    const localCache = localStorage.getItem(CACHE_KEY);
    if (localCache) {
      try {
        cacheRef.current = JSON.parse(localCache);
      } catch {
        cacheRef.current = {};
      }
    }
  }, []);

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

      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheRef.current));

      setTotalPages(total_pages);

      setLoading(false);
    }
    loadMovies();
  }, [page]);

  return { movies, totalPages, loading };
}
