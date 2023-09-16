import Home from './components/home/Home';
import './App.css';
import WatchScreen from './components/watch-screen/WatchScreen';
import { Route, Routes } from 'react-router';
import SearchScreen from './components/search-screen/SearchScreen';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Home/>} path='/'/>
        <Route element={<WatchScreen/>} path='/movies/:id'/>
        <Route element={<SearchScreen/>} path='/search/:input'/>
      </Routes>
    </div>
  );
}

export default App;