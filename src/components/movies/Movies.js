import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import request from '../../api'
import Card from '../card/Card'
import Footer from '../footer/Footer'
import MoviesSidebar from './MoviesSidebar'
import './movies.css'

const Movies = ({darkMode}) => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  const [movies, setMovies] = useState([])
  const category = (select) => setActive(select)
  const toggleSidebar = () => setOpen(!open)

  useEffect(() => {
    const getMovies = ['trending/movie/day', 'movie/top_rated', '28', '35', '27', '10749', '99']
    const searchMovies = async () => {
      try {
        let response
        if (active < 2){
          response = await request.get(`/${getMovies[active]}`)
        }
        else{
          response = await request.get('/discover/movie', {
            params: {
              with_genres: getMovies[active]
            }
          })
        }
        const movieData = response.data.results
        const moviesWithPoster = movieData?.filter(movie => movie?.poster_path)
        setMovies(moviesWithPoster)
      } catch (err){
        setError('Could not fetch movies...try again')
      }
    }
    searchMovies()
  }, [active])

  if (error) return (
    <div className='movies-error'>
      {error}
      <span onClick={() => navigate(-1)} className='back back-button'>
        <img src='/icons/home/arrow-down.png' alt='img'/>
        <span>Back</span>
      </span>
    </div>
  )

  return (
    <div className='movies-1'>
      <div className='movies-header-1'>
        <div className='menu menu-hide'>
          <img src='/icons/header/logo.png' alt='img'/>
          <span>MovieBox</span>
        </div>
        <div className='movies-content-1'>
          <span onClick={() => category(0)} className={`content-5 ${active === 0 && 'current'}`}>Trending Now</span>
          <span onClick={() => category(1)} className={`content-5 ${active === 1 && 'current'}`}>Top Rated</span>
          <span onClick={() => category(2)} className={`content-5 ${active === 2 && 'current'}`}>Action Thrillers</span>
          <span onClick={() => category(3)} className={`content-5 ${active === 3 && 'current'}`}>Comedies</span>
          <span onClick={() => category(4)} className={`content-5 ${active === 4 && 'current'}`}>Horror Movies</span>
          <span onClick={() => category(5)} className={`content-5 ${active === 5 && 'current'}`}>Romance Movies</span>
          <span onClick={() => category(6)} className={`content-5 ${active === 6 && 'current'}`}>Documentaries</span>
        </div>
        <div onClick={toggleSidebar} className={`navbar-icon-1 hide-icon ${open && 'hide-icon-1'}`}>
          <img src='/icons/header/navbar.png' alt='img'/>
        </div>
      </div>
      <div className={`small-screen ${open && 'small-screen-show'}`}>
        <MoviesSidebar active={active} category={category} toggleSidebar={toggleSidebar}/>
      </div>
      <Card movies={movies} darkMode={darkMode}/>
      <Footer darkMode={darkMode}/>
    </div>
  )
}

export default Movies