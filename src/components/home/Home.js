import React, {useEffect, useState} from 'react'
import request from '../../api'
import Card from '../card/Card'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import Banner from '../banner/Banner'
import { useNavigate } from 'react-router'
import './home.css'

const Home = () => {
  const banner = Banner()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [movies, setMovies] = useState([])
  const playTrailer = () => navigate(`/movies/${banner.movieId}`)

    useEffect(() => {
    const searchMovies = async () => {
      try {
        const response = await request.get('/discover/movie')
        const movieData = response.data.results
        setMovies(movieData)
      } catch (err){
        setError('An error occurred while fetching data.')
      }
    }
    searchMovies()
  }, [])

  return (
    <div className='home'>
      <div className='home-background' style={{ backgroundImage: `url(${banner.posterURL})` }}>
        <Header/>

        <div className='movie'>
          <div>
            <p className='title-1'>{banner.title}</p>
            <p className='scores'>
              <span className='name'>IMDb</span>
              <span className='rating'>{banner.vote} / 100</span>
              <span className='percentage'>
                <img src='/icons/home/fruit.png' alt='img'/> {banner.vote}%
              </span>
            </p>
            <p className='description-1'>{banner.description}</p>
            <button onClick={playTrailer}>  
              <img src='/icons/home/play.png' alt='img'/> WATCH TRAILER
            </button>
          </div>
        </div>
      </div>

      <div className='movies'>
        <div className='movies-header'>
          <span className='featured'>Featured Movies</span>
          <span className='see-more'>
            See more <img src='/icons/home/arrow-right.png' alt='img'/>
          </span>
        </div>

        <Card movies={movies}/>
      </div>

      <Footer/>
    </div>
  )
}

export default Home