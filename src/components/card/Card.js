import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router'
import { get, ref, set, update } from 'firebase/database';
import {database, userId, userRef} from '../../firebase'
import './card.css'

const Card = ({movies, darkMode}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [favorites, setFavorites] = useState([])
  const imageUrl = 'https://image.tmdb.org/t/p/w300/'
  const genres = [
    { name: 'Adventure', number: 12 }, { name: 'Fantasy', number: 14 }, { name: 'Animation', number: 16 }, { name: 'Drama', number: 18 },
    { name: 'Action', number: 28 }, { name: 'Horror', number: 27 }, { name: 'Comedy', number: 35 }, { name: 'History', number: 36 },
    { name: 'Western', number: 37 }, { name: 'Thriller', number: 53 }, { name: 'Crime', number: 80 }, { name: 'Documentary', number: 99 },
    { name: 'Science Fiction', number: 878 }, { name: 'Mystery', number: 9648 }, { name: 'Music', number: 10402 }, { name: 'Romance', number: 10749 },
    { name: 'Family', number: 10751 }, { name: 'War', number: 10752 }, { name: 'TV Movie', number: 10770 }
  ]

  const getGenreName = (genreId) => {
    const getName = genreId?.map((genreId) => {
      const genre = genres.find((g) => g.number === genreId || g.number === genreId.id)
      return genre ? genre.name : 'Movie'
    })
    return getName?.join(', ')
  }

  useEffect(() => {
    const checkUserStatus = async () => {
      try{
        // Check if the user exists in the database
        const snapshot = await get(userRef)
        if (!snapshot.exists()){
          // If user does not exist, initialize a new user with an empty movieId array and darkMode
          await set(ref(database, `users/${userId}`), {
            moviesId: [],
            darkMode: false
          })
        } else {
          // get the moviesId present
          const userData = snapshot.val()?.moviesId
          setFavorites(userData || [])
        }
      } catch (error){
        // console.error('Checking user status failed:', error)
      }
    }
    checkUserStatus()
    // call favoriteMovies with any number to ensure it is updated on component mount 
    favoriteMovies(1)
  }, [])

  const favoriteMovies = async (id) => {
    try{
      const snapshot = await get(userRef)
      let favoriteMovieIds = snapshot.val()?.moviesId || []
      const numberIndex = favoriteMovieIds.indexOf(id)

      // if movieId does not exists, add it to the array else remove it from the array
      if (numberIndex === -1) favoriteMovieIds.push(id)
      else favoriteMovieIds.splice(numberIndex, 1)

      // Update the favoriteMovieIds in the database
      await update(userRef, {
        moviesId: favoriteMovieIds
      })
      // Update the local state with the updated favorites
      setFavorites([...favoriteMovieIds])
    } catch (error){
      //console.error('Error:', error)
    }
  }

  return (
    <div className='cards-1'>
      <div className='movie-3'>
        {
          !location.pathname.startsWith('/favorite-movies') &&
          <div className={`favorite ${darkMode && 'favorite-dark'}`}>
            <span onClick={() => navigate('/favorite-movies')}>go to favorites</span>
            <img src='/icons/home/favorite.png' alt='img'/>
          </div>
        }
        {
          location.pathname === '/movies' &&
          <div onClick={() => navigate('/')} className={`back back-1 ${darkMode && 'back-1-dark'}`}>
            <img src='/icons/home/arrow-down.png' alt='img'/>
            <span>Back</span>
          </div>
        }
      </div>
      <div className={`movie-cards ${location.pathname === '/favorite-movies' && 'movie-cards-1'}`}>
        {movies?.map((movie, index) => (
          <div className='box' key={index}>
            <div className='image'>
              <img src={imageUrl + movie?.poster_path} alt='img' onClick={() => navigate(`/watch/${movie?.id}`)}/>
              <span onClick={() => favoriteMovies(movie?.id)} className={`favorite-movie ${favorites.includes(movie?.id) && 'added-to-favorite'}`}>
                <img src='/icons/home/favorite.png' alt='img'/>
              </span>
            </div>

            <div className='movie-description'>
              <p>USA, {movie?.release_date}</p>
              <p className={`movie-title ${darkMode && 'movie-title-dark'}`}>{movie?.title}</p>
              <p className={`movie-scores ${darkMode && 'movie-scores-dark'}`}>
                <span>
                  <span className='name'>IMDb</span>
                  <span className='rating'>{(movie?.vote_average * 10).toFixed(1)} / 100</span>
                </span>
                <span className='percentage'>
                  <img src='/icons/home/fruit.png' alt='img'/> {(movie?.vote_average * 10).toFixed(0)}%
                </span>
              </p>
              <p>{getGenreName(movie?.genre_ids || movie?.genres)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Card