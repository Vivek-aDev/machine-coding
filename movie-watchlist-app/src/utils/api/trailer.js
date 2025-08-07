import { BASE_URL, headers } from "../constants";

export async function fetchTrailer(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}/videos?language=en-US`, {
      method: "GET",
      headers,
    });
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Error loading trailer: ", error);
    return [];
  }
}
