import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import request from '../../api'
import Card from '../card/Card'
import './search-screen.css'
import '../card/card.css'

const SearchScreen = () => {
  const { input } = useParams()
  const [error, setError] = useState('')
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const searchMovies = async () => {
      try {
        const response = await request.get('/search/movie', {
          params: {
            query: input,
          },
        })

        const movieData = response.data.results
        const moviesWithPoster = movieData.filter(movie => movie.poster_path);

        if (moviesWithPoster.length > 0) {
          setMovies(moviesWithPoster)
        } else {
          setError('No movies with poster URLs found.');
        }
      } catch (err){
        setError('An error occurred while fetching data.')
      }
    }
    searchMovies()
  }, [])

  if (movies.length === 0){
    return (
      <div className='spin'>
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className='search movie-cards'>
      <div className='result'>Result(s): {input}</div>
      <Card movies={movies}/>
    </div>
  )
}

export default SearchScreen