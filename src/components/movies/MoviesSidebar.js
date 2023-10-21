import React from 'react'
import './movies-sidebar.css'

const MoviesSidebar = ({active, category, toggleSidebar}) => {
  const toggle = (select) => {
    toggleSidebar()
    category(select)
  }

  return (
    <div className='movies-sidebar'>
      <div onClick={toggleSidebar} className='transparent-bg'></div>
      <div className='movies-sidebar-content'>
        <div onClick={toggleSidebar} className='navbar-icon-1 close-icon'>
          <img src='/icons/header/navbar.png' alt='img'/>
        </div>
        <span onClick={() => toggle(0)} className={`content-6 ${active === 0 && 'current-1'}`}>Trending Now</span>
        <span onClick={() => toggle(1)} className={`content-6 ${active === 1 && 'current-1'}`}>Top Rated</span>
        <span onClick={() => toggle(2)} className={`content-6 ${active === 2 && 'current-1'}`}>Action Thrillers</span>
        <span onClick={() => toggle(3)} className={`content-6 ${active === 3 && 'current-1'}`}>Comedies</span>
        <span onClick={() => toggle(4)} className={`content-6 ${active === 4 && 'current-1'}`}>Horror Movies</span>
        <span onClick={() => toggle(5)} className={`content-6 ${active === 5 && 'current-1'}`}>Romance Movies</span>
        <span onClick={() => toggle(6)} className={`content-6 ${active === 6 && 'current-1'}`}>Documentaries</span>
      </div>
    </div>
  )
}

export default MoviesSidebar