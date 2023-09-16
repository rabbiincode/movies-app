import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './header.css'

const Header = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)

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

  const searchMovies = (e) => {
    e.preventDefault()
    if (input) navigate(`/search/${input}`)
  }

  return (
    <div className={`header ${isScrolled && 'change-background'}`}>
      <div className='menu'>
        <img src='/icons/header/logo.png' alt='img'/>
        <span>MovieBox</span>
      </div>

      <form onSubmit={searchMovies}>
        <input placeholder='What do you want to watch?' type='text' value={input} onChange={e => setInput(e.target.value)}/>
        <img src='/icons/header/search.png' alt='img'/>
      </form>

      <div className='navbar'>
        <span className='sign-in'>sign in</span>
        <span className='navbar-icon-1'>
          <img src='/icons/header/navbar.png' alt='img'/>
        </span>
      </div>
    </div>
  )
}

export default Header