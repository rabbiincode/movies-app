import React, {useState} from 'react'
import { useLocation, useNavigate } from 'react-router'
import './card.css'

const Card = ({movies}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [favorites, setFavorites] = useState([])
  const favoriteMoviesString = JSON.stringify(favorites)
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

  const favoriteMovies = (movieId) => {
    if (favorites.includes(movieId)){
      const updatedFavorites = favorites.filter((id) => id !== movieId)
      setFavorites(updatedFavorites)
    } else{
      setFavorites([...favorites, movieId])
    }
  }
  console.log(movies)
  return (
    <div>
      {
        !location.pathname.startsWith('/favorite-movies') &&
        <div className='favorite'>
          <span onClick={() => navigate(`/favorite-movies/${favoriteMoviesString}`)}>go to favorites</span>
          <img src='/icons/home/favorite.png' alt='img'/>
        </div>
      }
      <div className={`movie-cards ${location.pathname.startsWith('/favorite-movies') && 'movie-cards-1'}`}>
        {movies?.map((movie, index) => (
          <div className='box' key={index}>
            <div className='image'>
              <img src={imageUrl + movie.poster_path} alt='img' onClick={() => navigate(`/movies/${movie.id}`)}/>
              <span onClick={() => favoriteMovies(movie.id)} className={`favorite-movie ${favorites.includes(movie.id) && 'added-to-favorite'}`}>
                <img src='/icons/home/favorite.png' alt='img'/>
              </span>
            </div>

            <div className='movie-description'>
              <p>USA, {movie.release_date}</p>
              <p className='movie-title'>{movie.title}</p>
              <p className='movie-scores'>
                <span>
                  <span className='name'>IMDb</span>
                  <span className='rating'>{(movie.vote_average * 10).toFixed(1)} / 100</span>
                </span>
                <span className='percentage'>
                  <img src='/icons/home/fruit.png' alt='img'/> {(movie.vote_average * 10).toFixed(0)}%
                </span>
              </p>
              <p>{getGenreName(movie.genre_ids || movie.genres)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Card