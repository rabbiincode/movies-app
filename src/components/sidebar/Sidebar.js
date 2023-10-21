import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import './sidebar.css'

const Sidebar = ({open, toggleSidebar, darkMode}) => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className={`sidebar ${open && 'show'} ${darkMode && 'sidebar-dark'}`}>
      <span onClick={() => toggleSidebar()} className='navbar-icon'>
        <img src='/icons/header/navbar.png' alt='img' className='toggle'/>
      </span>
      <div className='logo'>
        <img src='/icons/header/logo.png' alt='img'/>
        <span>MovieBox</span>   
      </div>

      <div className='content'>
        <span onClick={()=> navigate('/')} className={location.pathname === '/' && 'active-link'}>
          <img src='/icons/sidebar/home.png' alt='img'/> Home
        </span>
        <span className={location.pathname.startsWith('/watch/') && 'active-link'}>
          <img src='/icons/sidebar/movie-projector.png' alt='img'/> Movies
        </span>
        <span>
          <img src='/icons/sidebar/tv-show.png' alt='img'/> TV Series
        </span>
        <span>
          <img src='/icons/sidebar/calendar.png' alt='img'/> Upcoming
        </span>
        <div className='play'>
          <p>Play movie quizzes</p>
          <p>and earn</p>
          <p>free tickets</p>
          <span className='numbers'>50K people are playing now</span><br/>
          <button>Start playing</button>
        </div>
        <span>
          <img src='/icons/sidebar/logout.png' alt='img'/> Log out
        </span>
      </div>
    </div>
  )
}

export default Sidebar