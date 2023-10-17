import { useEffect, useState } from 'react'
import request from '../../api'

const Banner = () => {
  const [error, setError] = useState('')
  const [movieData, setMovieData] = useState({ title: '', description: '', posterURL: '', vote: '', movieId: '' })

  useEffect(() => {
    // Fetch a random movie poster
    const randomPage = Math.floor(Math.random() * 100) + 1
    const getMovieBanner = async () => {
      try {
        const response = await request.get('/discover/movie', {
          params: {
            query: randomPage,
          },
        })

        const movies = response.data.results
        const randomMovie = movies[Math.floor(Math.random() * movies.length)]

        const title = randomMovie.title
        const description = randomMovie.overview
        const vote = randomMovie.vote_average * 10
        const movieId = randomMovie.id
        const posterPath = randomMovie.poster_path
        const fullPosterURL = `https://image.tmdb.org/t/p/original/${posterPath}`

        setMovieData({ title, description, posterURL: fullPosterURL, vote, movieId })
      } catch (err){
        setError('An error occurred while fetching data')
      }
    }
    getMovieBanner()
  }, [])

  return error ? error : movieData
}

export default Banner