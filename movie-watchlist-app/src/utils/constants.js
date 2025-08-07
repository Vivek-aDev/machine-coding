const BASE_URL = "https://api.themoviedb.org/3/movie";
const TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;

const headers = {
  accept: "application/json",
  Authorization: TOKEN,
};

export { BASE_URL, TOKEN, headers };
