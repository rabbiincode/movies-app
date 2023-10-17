import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import request from '../../api'
import Card from '../card/Card'
import Footer from '../footer/Footer'
import '../search-screen/search-screen.css'
import '../card/card.css'

const FavoriteMovies = () => {
  const navigate = useNavigate()
  const { favorites } = useParams()
  const favoriteMovies = JSON.parse(favorites)
  const [error, setError] = useState('')
  const [movies, setMovies] = useState([])
  // const back = () => {
  //   if (location.pathname.startsWith('/search/')) navigate('/search')
  //   else if (location.pathname.startsWith('/favorite-movies/')) navigate('/')
  //   else (navigate('/')
  // }

  useEffect(() => {
    const fetchFavoriteMovieDetails = async () => {
      if (favoriteMovies && favoriteMovies.length > 0) {
        const getMovies = favoriteMovies?.map(async (favorite) => {
          try {
            const response = await request.get(`/movie/${favorite}`)
            return response.data
          } catch (error) {
            setError('Could not get favorite movies...please try again')
            setMovies([])
          }
        })
        const movieDetails = await Promise.all(getMovies)
        setMovies(movieDetails)
      }
    }
    fetchFavoriteMovieDetails()
  }, [favoriteMovies])

  if (!favoriteMovies.length > 0 || !movies.length > 0){
    return (
      <div className='no-result'>
        <div className='no-result-1'>
          <span>{!favoriteMovies.length > 0 ? 'No Favorite Movie Added Yet' : error}</span>
          <span onClick={() => navigate('/')} className='back back-button'>
            <img src='/icons/home/arrow-down.png' alt='img'/>
          <span>Back</span>
        </span>
        </div>
      </div>
    )
  }
  console.log(movies)
  return (
    <div className='search'>
      <div className='result favorites'>
        <span>Favorite Movie(s)</span>
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

export default FavoriteMovies