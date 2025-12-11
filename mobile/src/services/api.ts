export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
}

export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_URL,
  API_KEY: process.env.EXPO_PUBLIC_API_KEY,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
  },
}

export async function fetchMovies({ query }: { query?: string }) {
  const endpoint = query ?
    `/search/movie?query=${encodeURIComponent(query)}` :
    '/discover/movie?sort_by=popularity.desc'

  const response = await fetch(`${TMDB_CONFIG.BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: TMDB_CONFIG.headers,
  })

  if (!response.ok) {
    throw new Error('Failed to fetch movies')
  }

  const data = await response.json()
  return data.results
}

export async function fetchMovieDetails(id: string) {
  const endpoint = `/movie/${id}?api_key=${TMDB_CONFIG.API_KEY}`

  const response = await fetch(`${TMDB_CONFIG.BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: TMDB_CONFIG.headers,
  })

  if (!response.ok) {
    throw new Error('Failed to fetch movie details')
  }

  const data = await response.json()
  return data
}

export async function updateSearchCount(searchTerm: string, movie: Movie) {
  console.log('Calling updateSearchCount with:', searchTerm, movie)

  const endpoint = "/movies/search"

  const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      ...API_CONFIG.headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      searchTerm,
      posterUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
      movieId: movie.id.toString(),
      title: movie.title,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    console.error('Error response from updateSearchCount:', err)
    throw new Error('Failed to update search count', { cause: err })
  }

  const data = await response.json()
  return data
}

export async function fetchPopularMovies() {
  const endpoint = '/movies/popular'

  const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: API_CONFIG.headers,
  })

  if (!response.ok) {
    throw new Error('Failed to fetch popular movies')
  }

  const data = await response.json() as TrendingMovie[]
  return data
}
