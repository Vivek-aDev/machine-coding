import { BASE_URL, headers } from "../constants";

export async function fetchNowPlayingMovies(page=1) {
  try {
    const res = await fetch(`${BASE_URL}/now_playing?language=en-US&page=${page}`, {
      method: "GET",
      headers,
    });

    if (!res.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await res.json();
    return data || [];
    // return data.results || [];
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
}
