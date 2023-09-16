import React, {useEffect, useState} from 'react'
import request from '../../api'
import Banner from '../banner/Banner'
import Sidebar from '../sidebar/Sidebar'
import './watch-screen.css'
import { useParams } from 'react-router'

const WatchScreen = () => {
  const banner = Banner()
  const { id } = useParams()
  const [error, setError] = useState('')
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
  }, [banner.movieId])

  const { title, runtime, release_date, vote_average, vote_count, overview, awards, nominations } = movieDetails
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  return (
    <div className='watch-screen'>
      <Sidebar open={open} toggleSidebar={toggleSidebar}/>

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
          <p className='heading'>
            <span className='heading-description'>
              <span data-testid="movie-title">{title}</span>
              <span>•</span>
              <span data-testid="movie-release-date">{new Date(release_date).getUTCFullYear()}</span>
              <span>•</span>
              <span>PG-13</span>
              <span>•</span>
              <span data-testid="movie-runtime">{runtime}Mins</span>
            </span>
            <small>Action</small>
            <small>Drama</small>
          </p>
          <p className='count'>
            <img src='/icons/watch/star.png' alt='img'/>
            <span>{vote_average?.toFixed(1)}</span> | {vote_count}k
          </p>
        </div>

        <div className='cards'>
          <div className='card-1'>
            <p className='card-1-desc' data-testid="movie-overview">{overview}</p>

            <p>Director: <span>{director || '-'}</span></p>
            <p>Writers: <span>{writers.join(', ') || '-'}</span></p>
            <p>Stars: <span>{stars.join(', ') || '-'}</span></p>
            <div className='click'>
              <button>Top rated movie #65</button>
              <button className='button-1'>
                Awards 9 nominations <img src='/icons/home/arrow-down.png' alt='img'/>
              </button>
            </div>
          </div>

          <div className='card-2'>
            <button>
              <img src='/icons/watch/tickets.png' alt='img'/> See Showtimes
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