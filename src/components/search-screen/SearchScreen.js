import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import request from '../../api'
import Card from '../card/Card'
import './search-screen.css'
import '../card/card.css'
import Footer from '../footer/Footer'

const SearchScreen = () => {
  const { input } = useParams()
  const navigate = useNavigate()
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
    <div className='search'>
      <div className='result'>
        <span>Result(s): {input}</span>
        <span onClick={() => navigate('/')} className='back'>
          <img src='/icons/home/arrow-down.png' alt='img'/>
          <span>Back</span>
        </span>
      </div>
      <Card movies={movies}/>
      <Footer/>
    </div>
  )
}

export default SearchScreen