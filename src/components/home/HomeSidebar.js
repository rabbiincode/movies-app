import React, {useState} from 'react'
import ToggleButton from '../toggleButton/ToggleButton'
import UserDetails from '../authentication/UserDetails'
import { useLogout } from '../authentication/LogOut'
import './home-sidebar.css'

const HomeSidebar = ({darkMode, toggleSidebar, searchMovies}) => {
  const logout = useLogout()
  const userId = UserDetails()
  const [input, setInput] = useState('')
  const handleLogout = () => logout()

  return (
    <div className='home-sidebar'>
      <div className='home-sidebar-content'>
        <span onClick={toggleSidebar} className='navbar-icon-1 hide-sidebar'>
          <img src='/icons/header/navbar.png' alt='img'/>
        </span>
        <span className='signed-in-1'>Hi, {userId?.email.split('@')[0]}</span>

        <div className='input-field'>
          <form onSubmit={(e) => searchMovies(e, input)} className='form-1'>
            <input placeholder='What do you want to watch?' type='text' value={input} onChange={e => setInput(e.target.value)}/>
            <img src='/icons/header/search.png' alt='img'/>
          </form>

          <div className='toggle-button-2'>
            <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
            <ToggleButton darkMode={darkMode}/>
          </div>
        </div>
        <span onClick={handleLogout} className='log-out'>LogOut</span>
        <span className='movie-box'>MovieBox</span>
      </div>
      <div onClick={toggleSidebar} className='bg-transparent-1'></div>
    </div>
  )
}

export default HomeSidebar