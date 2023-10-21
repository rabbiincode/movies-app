import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { getDatabase, ref, onValue } from 'firebase/database';
import Home from './components/home/Home';
import Movies from './components/movies/Movies';
import WatchScreen from './components/watch-screen/WatchScreen';
import SearchScreen from './components/search-screen/SearchScreen';
import FavoriteMovies from './components/favorite-movies/FavoriteMovies';
import './App.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [favoriteMoviesId, setFavoriteMoviesId] = useState([])

  useEffect(() => {
    // Listens actively to the database for changes and updates immediately
    const database = getDatabase()
    const usersRef = ref(database, 'users')

    const unsubscribe = onValue(usersRef, (snapshot) => {
      const users = snapshot.val() || []
      const usersArray = Object.values(users)
      usersArray.map((user) => {
        setDarkMode(user?.darkMode)
        setFavoriteMoviesId(user?.moviesId)
        return user
      })
    })
    // Clean up the listener when the component unmounts
    return () => unsubscribe()
  }, [darkMode, favoriteMoviesId])

  return (
    <div className={`app ${darkMode && 'app-dark'}`}>
      <Routes>
        <Route element={<Home darkMode={darkMode}/>} path='/'/>
        <Route element={<Movies darkMode={darkMode}/>} path='/movies'/>
        <Route element={<WatchScreen darkMode={darkMode}/>} path='/watch/:id'/>
        <Route element={<SearchScreen darkMode={darkMode}/>} path='/search/:input'/>
        <Route element={<FavoriteMovies favoriteMoviesId={favoriteMoviesId} darkMode={darkMode}/>} path='/favorite-movies'/>
      </Routes>
    </div>
  )
}

export default App