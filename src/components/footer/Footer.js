import React from 'react'
import './footer.css'

const Footer = ({darkMode}) => {
  return (
    <div className={`footer ${darkMode && 'footer-dark'}`}>
      <div className='socials'>
        <img src='/icons/socials/facebook.png' alt='img' className='facebook'/>
        {darkMode ? <img src='/icons/socials/instagram1.png' alt='img'/> : <img src='/icons/socials/instagram.png' alt='img'/>}
        {darkMode ? <img src='/icons/socials/twitter1.png' alt='img'/> : <img src='/icons/socials/twitter.png' alt='img'/>}
        <img src='/icons/socials/youtube.png' alt='img'/>
      </div>

      <div className='info'>
        <span className='conditions'>Conditions of Use</span>
        <span>Privacy & Policy</span>
        <span>Press Room</span>
      </div>
      <div className='copyright'>&copy; {new Date().getFullYear()} MovieBox by Success</div>
    </div>
  )
}

export default Footer