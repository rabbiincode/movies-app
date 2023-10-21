import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import request from '../../api'
import Banner from '../banner/Banner'
import Sidebar from '../sidebar/Sidebar'
import './watch-screen.css'

const WatchScreen = ({darkMode}) => {
  const banner = Banner()
  const {id} = useParams()
  const [error, setError] = useState('loading...')
  const [open, setOpen] = useState(false)
  const [director, setDirector] = useState('')
  const [writers, setWriters] = useState([])
  const [stars, setStars] = useState([])
  const [trailerKey, setTrailerKey] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [movieDetails, setMovieDetails] = useState({})
  const toggleSidebar = () => setOpen(!open)

  useEffect(() => {
    // Fetch movie details by ID
    const fetchMovieDetails = async () => {
      try {
        const response = await request.get(`/movie/${id}`)
        setMovieDetails(response.data)
      } catch (error) {
        setError('Error fetching movie details', error)
      }

      try {
        const response = await request.get(`/movie/${id}`,
        {
          params: {
            // Get cast and crew information
            append_to_response: 'credits',
          },
        })

        const { crew, cast } = response.data.credits
        const movieDirector = crew.find((person) => person.job === 'Director')
        const movieWriters = crew.filter((person) => person.department === 'Writing')
        // Get the top 3 movie writers and cast members
        const movieWriters1 = movieWriters.slice(0, 3)
        const movieStars = cast.slice(0, 3)

        setDirector(movieDirector.name)
        setWriters(movieWriters1.map((writer) => writer.name))
        setStars(movieStars.map((star) => star.name))
      } catch (error) {
        setError('Error fetching movie credits', error)
      }
    }

    // Fetch the trailer key
    const fetchTrailerKey = async () => {
      try {
        const response = await request.get(`/movie/${id}/videos`)
        if (response.data.results.length > 0) {
          setTrailerKey(response.data.results[0].key)
        }
      } catch (error) {
        setError('Error fetching trailer key', error)
      }
    }
    fetchMovieDetails()
    fetchTrailerKey()
  }, [id])

  const { title, runtime, release_date, vote_average, vote_count, overview } = movieDetails
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const formatTime = (minutes) => {
    if (minutes >= 60){
      const hours = Math.floor(minutes / 60)
      minutes %= 60
      if (minutes === 0){
        return hours + 'h'
      } else{
        return hours + 'h ' + minutes + 'm'
      }
    } else{
      return minutes + 'm'
    }
  }

  if (!id) return error

  return (
    <div className={`watch-screen ${darkMode && 'watch-screen-dark'}`}>
      <Sidebar open={open} toggleSidebar={toggleSidebar} darkMode={darkMode}/>
      <span className='navbar-icon'>
        <img src='/icons/header/navbar.png' alt='img' onClick={() => toggleSidebar()} className='toggle'/>
      </span>

      <div className='watch'>
        <div className='trailer-player'>
          <iframe
            title="Movie's Trailer" width="100%" height="100%"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=${isPlaying ? 1 : 0}`}
            frameborder="0" allowfullscreen allow='autoplay'
          ></iframe>
          {
            !isPlaying && (
              <>
                <img src='/icons/watch/play.png' alt='img' onClick={() => setIsPlaying(true)} className='click-play play-button'/>
                <span className='click-play watch-trailer'>Watch Trailer</span>
              </>
            )
          }
        </div>

        <div className='title'>
          <p className={`heading ${darkMode && 'heading-dark'}`}>
            <span className='heading-description'>
              <span>{title}</span>
              <span>•</span>
              <span>{new Date(release_date).getUTCFullYear()}</span>
              <span>•</span>
              <span>PG-13</span>
              <span>•</span>
              <span>{formatTime(runtime)}</span>
            </span>
            <small>Action</small>
            <small>Drama</small>
          </p>
          <p className='count'>
            <img src='/icons/watch/star.png' alt='img'/>
            <span className='vote_average'>{vote_average?.toFixed(1)}</span>
            <span className='vote_count'>| {vote_count}k</span>
          </p>
        </div>

        <div className='cards'>
          <div className={`card-1 ${darkMode && 'card-1-dark'}`}>
            <p className='card-1-desc'>{overview}</p>
            <p>Director: <span>{director || '-'}</span></p>
            <p>Writers: <span>{writers.join(', ') || '-'}</span></p>
            <p>Stars: <span>{stars.join(', ') || '-'}</span></p>
            <div className={`click ${darkMode && 'click-dark'}`}>
              <button className={`${darkMode && 'button-dark'}`}>Top rated movie #65</button>
              <button className={`button-1 ${darkMode && 'button-1-dark'}`}>
                Awards 9 nominations <img src='/icons/home/arrow-down.png' alt='img'/>
              </button>
            </div>
          </div>

          <div className='card-2'>
            <button className={`${darkMode && 'button-dark'}`}>
              <img src='/icons/watch/tickets.png' alt='img'/> See ShowTimes
            </button>
            <button className='button-2'>
              <img src='/icons/watch/list.png' alt='img'/> More watch options
            </button>
            <div className='image-banner' style={{ backgroundImage: `url(${banner.posterURL})` }}>
              <span><img src='/icons/watch/list1.png' alt='img'/> The Best Movies and Shows in {month[new Date().getMonth()]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WatchScreen