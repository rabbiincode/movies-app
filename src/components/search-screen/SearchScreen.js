import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import request from '../../api'
import Card from '../card/Card'
import Footer from '../footer/Footer'
import './search-screen.css'
import '../card/card.css'

const SearchScreen = ({darkMode}) => {
  const { input } = useParams()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const searchMovies = async () => {
      try {
        const response = await request.get('/search/movie', {
          params: {
            query: input
          }
        })
        const movieData = response.data.results
        const moviesWithPoster = movieData?.filter(movie => movie?.poster_path)

        if (moviesWithPoster.length > 0) {
          setMovies(moviesWithPoster)
        } else {
          setError('No movies with poster URLs found')
        }
      } catch (err){
        setError('Could not get result...please try again')
      }
    }
    searchMovies()
  }, [input])

  if (movies.length === 0){
    return (
      <>
       {
         !error ?
         <div className='spin'><span className="spinner"></span></div> :
         <diV className='spin'>
           <span>{error}</span>
           <span onClick={() => navigate('/')} className='back back-button'>
             <img src='/icons/home/arrow-down.png' alt='img'/>
             <span>Back</span>
           </span>
         </diV>
       }
      </>
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
      <Card movies={movies} darkMode={darkMode}/>
      <Footer darkMode={darkMode}/>
    </div>
  )
}

export default SearchScreen