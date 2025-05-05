export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

// Fetch Movies
export const fetchMovies = async ({
  query,
  request,
}: {
  query?: string;
  request?: string;
}): Promise<Movie[]> => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/multi?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/${request}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }

  const data = await response.json();
  return data.results;
};

// Fetching movie details
export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );
    if (!response.ok) {
      // @ts-ignore
      throw new Error("Failed to fetch movie details", response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// TvShows Details
export const fetchTvShowsDetails = async (
  movieId: string
): Promise<TvShowsDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/tv/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );
    if (!response.ok) {
      // @ts-ignore
      throw new Error("Failed to fetch movie details", response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Fetching Casts
export const fetchCasts = async (
  movieId: string,
  type: string
): Promise<Cast[]> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/${type}/${movieId}/credits?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );
    if (!response.ok) {
      // @ts-ignore
      throw new Error("Failed to fetch movie details", response.statusText);
    }

    const data = await response.json();
    return data.cast.slice(0, 6);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Fetching Trailers
export const fetchTrailers = async (endpoint: string): Promise<Trailer[]> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/${endpoint}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }

    const data = await response.json();
    const filteredTrailers = data.results.filter(
      (video: any) =>
        video.type === "Trailer" && video.site === "YouTube" && video.official
    );
    return filteredTrailers;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
