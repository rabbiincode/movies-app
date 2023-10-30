import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useLogout } from '../authentication/LogOut'
import './sidebar.css'

const Sidebar = ({open, toggleSidebar, darkMode}) => {
  const logout = useLogout()
  const location = useLocation()
  const navigate = useNavigate()
  const [routeChanges, setRouteChanges] = useState(0)
  const handleLogout = () => logout()
  const movieRouteChange  = (path) => {
    path === 'tv' ? navigate('/movies/:tv-series') : navigate('/movies/:upcoming')
    toggleSidebar()
  }

  useEffect(() => {
    // Track route changes to be able to navigate back to watch screen regardless of no of times users change route
    if (location.pathname.startsWith('/watch')) setRouteChanges(0)
    else setRouteChanges(prevCount => prevCount + 1)
  }, [location.pathname])

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
        <span onClick={() => navigate('/')} className={location.pathname === '/' && 'active-link'}>
          <img src='/icons/sidebar/home.png' alt='img'/> Home
        </span>
        <span onClick={() => navigate(-routeChanges)} className={location.pathname.startsWith('/watch/') && 'active-link'}>
          <img src='/icons/sidebar/movie-projector.png' alt='img'/> Watch
        </span>
        <span onClick={()=>movieRouteChange('tv')} className={location.pathname === '/movies/:tv-series' && 'active-link'}>
          <img src='/icons/sidebar/tv-show.png' alt='img'/> Tv Series
        </span>
        <span onClick={()=>movieRouteChange('')} className={location.pathname === '/movies/:upcoming' && 'active-link'}>
          <img src='/icons/sidebar/calendar.png' alt='img'/> Upcoming
        </span>
        <div className='play'>
          <p>Play movie quizzes</p>
          <p>and earn</p>
          <p>free tickets</p>
          <span className='numbers'>50K people are playing now</span><br/>
          <button>Start playing</button>
        </div>
        <span onClick={handleLogout}>
          <img src='/icons/sidebar/logout.png' alt='img'/> Log out
        </span>
      </div>
    </div>
  )
}

export default Sidebar