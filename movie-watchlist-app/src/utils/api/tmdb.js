const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;

const headers = {
  accept: "application/json",
  Authorization: TOKEN,
};

export async function fetchNowPlayingMovies() {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/now_playing?language=en-US&page=1`,
      {
        method: "GET",
        headers,
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
}
