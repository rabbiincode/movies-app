import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import request from '../../api'
import Card from '../card/Card'
import Footer from '../footer/Footer'
import '../search-screen/search-screen.css'
import '../card/card.css'

const FavoriteMovies = ({favoriteMoviesId, darkMode}) => {
  const navigate = useNavigate()
  const [movies, setMovies] = useState([])
  const [error, setError] = useState('please wait...')
  // Filter out the random number(1) added while calling it in the cards component to ensures it renders before component mounts
  const validMoviesId = favoriteMoviesId?.filter(movieId => movieId !== 1)

  useEffect(() => {
    const fetchFavoriteMovieDetails = async () => {
      if (validMoviesId?.length > 0) {
        const getMovies = favoriteMoviesId?.map(async (favorite) => {
          try{
            const response = await request.get(`/movie/${favorite}`)
            return response.data
          } catch (error){
            setError('Could not get favorite movies...please try again')
            setMovies([])
          }
        })
        const movieDetails = await Promise.all(getMovies)
        // Filter out undefined and null values which indicate missing or invalid moviesId
        const validMovies = movieDetails?.filter(movie => movie !== undefined && movie !== null)
        setMovies(validMovies)

      }
    }
    fetchFavoriteMovieDetails()
  }, [favoriteMoviesId, validMoviesId?.length])

  if (!validMoviesId?.length > 0 || !movies.length > 0){
    return (
      <div className='no-result'>
        <div className='no-result-1'>
          <span>{!validMoviesId?.length > 0 ? 'No Favorite Movie Added Yet' : error}</span>
          <span onClick={() => navigate('/')} className='back back-button'>
            <img src='/icons/home/arrow-down.png' alt='img'/>
          <span>Back</span>
        </span>
        </div>
      </div>
    )
  }

  return (
    <div className='search'>
      <div className='result favorites'>
        <span>Favorite Movie(s)</span>
        <span onClick={() => navigate(-1)} className='back fav-back'>
          <img src='/icons/home/arrow-down.png' alt='img'/>
          <span>Back</span>
        </span>
      </div>
      <Card movies={movies} darkMode={darkMode}/>
      <Footer darkMode={darkMode}/>
    </div>
  )
}

export default FavoriteMovies