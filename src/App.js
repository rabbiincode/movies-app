import Home from './components/home/Home';
import WatchScreen from './components/watch-screen/WatchScreen';
import SearchScreen from './components/search-screen/SearchScreen';
import FavoriteMovies from './components/favorite-movies/FavoriteMovies';
import { Route, Routes } from 'react-router';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route element={<Home/>} path='/'/>
        <Route element={<WatchScreen/>} path='/movies/:id'/>
        <Route element={<SearchScreen/>} path='/search/:input'/>
        <Route element={<FavoriteMovies/>} path='/favorite-movies/:favorites'/>
      </Routes>
    </div>
  )
}

export default App;