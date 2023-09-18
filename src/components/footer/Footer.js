import React from 'react'
import './footer.css'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='socials'>
        <img src='/icons/socials/facebook.png' alt='img'/>
        <img src='/icons/socials/instagram.png' alt='img'/>
        <img src='/icons/socials/twitter.png' alt='img'/>
        <img src='/icons/socials/youtube.png' alt='img'/>
      </div>

      <div className='info'>
        <span>Conditions of Use</span>
        <span>Privacy & Policy</span>
        <span>Press Room</span>
      </div>
      <div className='copyright'>&copy; {new Date().getFullYear()} MovieBox by Success</div>
    </div>
  )
}

export default Footer