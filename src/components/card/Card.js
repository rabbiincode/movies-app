import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router'
import { get, ref, set } from 'firebase/database';
import {database, userData, userId, userRef} from '../../firebase'
import './card.css'

const Card = ({movies}) => {
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
        const snapshot = await get(userData)
        console.log('snapshot',snapshot.val())
        if (!snapshot.exists()){
          // If user does not exist, initialize a new user with an empty movieId array
          await set(ref(database, `users/${userId}`), {
            moviesId: []
          })
        } else {
          const userData = []
          snapshot.forEach((id) => {
            const data = id.val()
            userData.push(data)
          })
          setFavorites(userData)
        }
      } catch (error){
        console.error('Checking user status failed:', error)
      }
    }
    checkUserStatus()
    // call favoriteMovies with any number to ensure it is updated on component mount 
    favoriteMovies(1)
  }, [])

  const favoriteMovies = async (movieId) => {
    try{
      const snapshot = await get(userRef)
      let favoriteMovieIds = snapshot.val() || []
      const numberIndex = favoriteMovieIds.indexOf(movieId)

      // movieId does not exists, add it to the array else remove it from the array
      if (numberIndex === -1) favoriteMovieIds.push(movieId)
      else favoriteMovieIds.splice(numberIndex, 1)

      // Update the favoriteMovieIds in the database
      await set(userRef, favoriteMovieIds)

      // Update the local state with the updated favorites
      setFavorites([...favoriteMovieIds])
    } catch (error){
      console.error('Error:', error)
    }
  }
  console.log(movies)
  return (
    <div>
      {
        !location.pathname.startsWith('/favorite-movies') &&
        <div className='favorite'>
          <span onClick={() => navigate('/favorite-movies')}>go to favorites</span>
          <img src='/icons/home/favorite.png' alt='img'/>
        </div>
      }
      <div className={`movie-cards ${location.pathname.startsWith('/favorite-movies') && 'movie-cards-1'}`}>
        {movies?.map((movie, index) => (
          <div className='box' key={index}>
            <div className='image'>
              <img src={imageUrl + movie?.poster_path} alt='img' onClick={() => navigate(`/movies/${movie?.id}`)}/>
              <span onClick={() => favoriteMovies(movie?.id)} className={`favorite-movie ${favorites.includes(movie?.id) && 'added-to-favorite'}`}>
                <img src='/icons/home/favorite.png' alt='img'/>
              </span>
            </div>

            <div className='movie-description'>
              <p>USA, {movie?.release_date}</p>
              <p className='movie-title'>{movie?.title}</p>
              <p className='movie-scores'>
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