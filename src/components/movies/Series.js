import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router'
import Sidebar from '../sidebar/Sidebar'
import Card from '../card/Card'
import request from '../../api'
import './series.css'

const Series = ({darkMode}) => {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [movies, setMovies] = useState([])
  const [error, setError] = useState('')
  const toggleSidebar = () => setOpen(!open)

  useEffect(() => {
    const path = ['/movie/upcoming', 'tv/on_the_air']
    const show = location.pathname === '/movies/:upcoming' ? path[0] : path[1]
    const getMovie = async () => {
      try {
        const response = await request.get(show)
        const moviesData = response.data.results
        setMovies(moviesData)
      } catch (err){
        setError('An error occurred while fetching data...try again')
      }
    }
    getMovie()
  }, [location.pathname])

  return (
    <div className='series'>
      <Sidebar open={open} toggleSidebar={toggleSidebar} darkMode={darkMode}/>
      <span className='navbar-icon'>
        <img src='/icons/header/navbar.png' alt='img' onClick={() => toggleSidebar()} className='toggle'/>
      </span>

      <div className='series-content'>
        <div className='series-name'>{location.pathname === '/movies/:upcoming' ? 'UPCOMING' : 'TV SERIES'}</div>
        {error ? <span className='error'>{error}</span> : <Card movies={movies} darkMode={darkMode}/>}
      </div>
    </div>
  )
}

export default Series