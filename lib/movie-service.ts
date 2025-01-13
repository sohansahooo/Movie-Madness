const TMDB_API_URL = 'https://api.themoviedb.org/3'
const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p'

export async function getPopularMovies(page = 1, genreId?: number) {
  try {
    const genreParam = genreId ? `&with_genres=${genreId}` : ''
    const response = await fetch(
      `${TMDB_API_URL}/movie/popular?api_key=${process.env.TMDB_API_KEY}&page=${page}${genreParam}`
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch popular movies')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching popular movies:', error)
    return { results: [] }
  }
}

export async function searchMovies(query: string, page = 1) {
  try {
    const response = await fetch(
      `${TMDB_API_URL}/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}&page=${page}`
    )

    if (!response.ok) {
      throw new Error('Failed to search movies')
    }

    return await response.json()
  } catch (error) {
    console.error('Error searching movies:', error)
    return { results: [] }
  }
}

export async function getMovieDetails(id: number) {
  try {
    const response = await fetch(
      `${TMDB_API_URL}/movie/${id}?api_key=${process.env.TMDB_API_KEY}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch movie details')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching movie details:', error)
    return null
  }
}

export function getImageUrl(path: string, size: 'w500' | 'original' = 'w500') {
  return `${TMDB_IMAGE_URL}/${size}${path}`
}

export async function getMovieVideos(id: number) {
  try {
    const response = await fetch(
      `${TMDB_API_URL}/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch movie videos')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching movie videos:', error)
    return { results: [] }
  }
}

export async function getGenres() {
  try {
    const response = await fetch(
      `${TMDB_API_URL}/genre/movie/list?api_key=${process.env.TMDB_API_KEY}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch genres')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching genres:', error)
    return { genres: [] }
  }
}

