export async function fetchTrailer(id) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      {
        method: 'GET',
        headers: {
          accept: "application/json",
          Authorization: `${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
        },
      }
    );
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Error loading trailer: ", error);
    return [];
  }
}
