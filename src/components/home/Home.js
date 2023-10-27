import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router'
import request from '../../api'
import Banner from '../banner/Banner'
import UserDetails from '../authentication/UserDetails'
import Card from '../card/Card'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import './home.css'

const Home = ({darkMode}) => {
  const banner = Banner()
  const userId = UserDetails()
  const navigate = useNavigate()
  const [movies, setMovies] = useState([])
  const [error, setError] = useState('loading...')
  const playTrailer = () => navigate(`/watch/${banner.movieId}`)

  useEffect(() => {
    const searchMovies = async () => {
      try{
        const response = await request.get('/discover/movie')
        const movieData = response.data.results
        setMovies(movieData)
      } catch (err){
        setError('Could not fetch movies...try again')
      }
    }
    searchMovies()
  }, [userId?.id])

  return (
    <div className='home'>
      <div className='home-background' style={{ backgroundImage: `url(${banner.posterURL})`, backgroundSize: 'cover' }}>
        <Header darkMode={darkMode}/>
        <div className='movie'>
          <div className='content-title'>
            <div className='text'>
              <p className='title-1'>{banner.title}</p>
              <p className='scores'>
                <span className='name'>IMDb</span>
                <span className='rating'>{banner.vote} / 100</span>
                <span className='percentage'>
                  <img src='/icons/home/fruit.png' alt='img'/> {banner.vote}%
                </span>
              </p>
              <p className='description-1'>{banner.description}</p>
              </div>
              <button onClick={playTrailer} className='trailer-button'>  
                <img src='/icons/home/play.png' alt='img'/>WATCH TRAILER
              </button>
          </div>
        </div>
      </div>

      <div className='movies'>
        <div className='movies-header'>
          <span className='featured'>Featured Movies</span>
          <span onClick={() => navigate('/movies')} className='see-more'>
            See more <img src='/icons/home/arrow-right.png' alt='img'/>
          </span>
        </div>
        {movies.length > 0 ? <Card movies={movies} darkMode={darkMode}/> : <span className='error'>{error}</span>}
      </div>
      <Footer darkMode={darkMode}/>
    </div>
  )
}

export default Home