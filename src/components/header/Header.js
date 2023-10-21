import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { userId } from '../../firebase'
import HomeSidebar from '../home/HomeSidebar'
import ToggleButton from '../toggleButton/ToggleButton'
import './header.css'

const Header = ({darkMode}) => {
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const toggleSidebar = () => setOpen(!open)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const searchMovies = (e, value) => {
    e.preventDefault()
    if (value) navigate(`/search/${value}`)
  }

  return (
    <div className={`header ${isScrolled && 'change-background'}`}>
      <div className='menu'>
        <img src='/icons/header/logo.png' alt='img'/>
        <span>MovieBox</span>
      </div>

      <form onSubmit={(e) => searchMovies(e, input)} className='form'>
        <input placeholder='What do you want to watch?' type='text' value={input} onChange={e => setInput(e.target.value)}/>
        <img src='/icons/header/search.png' alt='img'/>
      </form>
      <span onClick={toggleSidebar} className='search-icon'><img src='/icons/header/search.png' alt='img'/></span>

      <div className='navbar'>
        <span className='signed-in'>Hi, {userId}</span>
        <span className='toggle-button-1'>
          <ToggleButton darkMode={darkMode}/>
        </span>
        <span onClick={toggleSidebar} className='navbar-icon-1 home-icon-1'>
          <img src='/icons/header/navbar.png' alt='img'/>
        </span>
      </div>
      <div className={`home-sidebar-hide ${open && 'home-sidebar-show'}`}>
        <HomeSidebar darkMode={darkMode} toggleSidebar={toggleSidebar} searchMovies={searchMovies}/>
      </div>
    </div>
  )
}

export default Header