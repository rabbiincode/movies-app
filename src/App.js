import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { getDatabase, ref, onValue } from 'firebase/database';
import Home from './components/home/Home';
import WatchScreen from './components/watch-screen/WatchScreen';
import SearchScreen from './components/search-screen/SearchScreen';
import FavoriteMovies from './components/favorite-movies/FavoriteMovies';
import './App.css';

const App = () => {
  const [favoriteMoviesId, setFavoriteMoviesId] = useState([])
  // Listens actively to the database for changes and updates immediately
  useEffect(() => {
    const database = getDatabase()
    const usersRef = ref(database, 'users')

    const unsubscribe = onValue(usersRef, (snapshot) => {
      const users = snapshot.val() || []
      const usersArray = Object.values(users)
      usersArray.map((user) => setFavoriteMoviesId(user.moviesId))
    })
    // Clean up the listener when the component unmounts
    return () => unsubscribe()
  }, [favoriteMoviesId])

  return (
    <div className="App">
      <Routes>
        <Route element={<Home/>} path='/'/>
        <Route element={<WatchScreen/>} path='/movies/:id'/>
        <Route element={<SearchScreen/>} path='/search/:input'/>
        <Route element={<FavoriteMovies favoriteMoviesId={favoriteMoviesId}/>} path='/favorite-movies'/>
      </Routes>
    </div>
  )
}

export default App