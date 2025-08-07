import { BASE_URL, headers } from "../constants";

export async function fetchNowPlayingMovies() {
  try {
    const res = await fetch(
      `${BASE_URL}/now_playing?language=en-US&page=1`,
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
