import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import { useNavigate } from "react-router-dom"
import Home from './components/home/Home'
import Movies from './components/movies/Movies'
import Series from './components/movies/Series'
import { Auth, user } from './components/authentication/Auth'
import WatchScreen from './components/watch-screen/WatchScreen'
import SearchScreen from './components/search-screen/SearchScreen'
import FavoriteMovies from './components/favorite-movies/FavoriteMovies'
import UserDetails from './components/authentication/UserDetails'
import supabase from './supabase'
import './App.css'

const App = () => {
  const userId = UserDetails()
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(true)
  const [favoriteMoviesId, setFavoriteMoviesId] = useState([])

  useEffect(() => {
    const getUser = async () => {
      try{
        // get current user, if non, throws an error and navigate to auth for login
        await user.user.getCurrent()
      } catch{
        navigate('/auth')
      }
    }
    getUser()
  }, [navigate])

  useEffect(() => {
    // Listens actively to the database for changes and updates immediately
    const subscription = supabase
    .channel('users')
    .on('postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'users',
        condition: `new.userid = '${userId?.id}'`,
      }, (payload) => {
      setDarkMode(payload.new.darkmode)
      setFavoriteMoviesId(payload.new.moviesid)
    })
    .subscribe()

    // Clean up the listener when the component unmounts
    return () => subscription.unsubscribe()
  }, [darkMode, favoriteMoviesId, userId?.id])

  return (
    <div className={`app ${darkMode && 'app-dark'}`}>
      <Routes>
        <Route element={<Auth/>} path='/auth'/>
        <Route element={<Home darkMode={darkMode}/>} path='/'/>
        <Route element={<Movies darkMode={darkMode}/>} path='/movies'/>
        <Route element={<Series darkMode={darkMode}/>} path='/movies/:series'/>
        <Route element={<WatchScreen darkMode={darkMode}/>} path='/watch/:id'/>
        <Route element={<SearchScreen darkMode={darkMode}/>} path='/search/:input'/>
        <Route element={<FavoriteMovies favoriteMoviesId={favoriteMoviesId} darkMode={darkMode}/>} path='/favorite-movies'/>
      </Routes>
    </div>
  )
}

export default App