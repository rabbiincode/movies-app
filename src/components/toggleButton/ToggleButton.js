import React from 'react'
import { userRef} from '../../firebase'
import { get, update } from 'firebase/database'
import './toggle-button.css'

const ToggleButton = ({darkMode}) => {
  const toggleButton = async () => {
    try{
      const snapshot = await get(userRef)
      let currentDarkMode  = snapshot.val()?.darkMode || false
      currentDarkMode = !currentDarkMode 
      // Update the darkMode in the database
      await update(userRef, {
        darkMode: currentDarkMode 
      })
    } catch (error){
      //console.error('Error:', error)
    }
  }

  return (
    <div className='toggle-button'>
      <input type="checkbox" id="checkbox" checked={darkMode} onChange={toggleButton}/>
    </div>
  )
}

export default ToggleButton