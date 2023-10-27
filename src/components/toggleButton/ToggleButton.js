import React from 'react'
import supabase from '../../supabase'
import UserDetails from '../authentication/UserDetails'
import './toggle-button.css'

const ToggleButton = ({darkMode}) => {
  const userId = UserDetails()

  const toggleButton = async () => {
    try{
      const { data: existingUser } = await supabase
      .from('users')
      .select('darkmode')
      .eq('userid', userId?.id)
      const currentDarkMode = existingUser[0].darkmode

      // Update the darkMode in the database
      await supabase
      .from('users')
      .update({ darkmode: !currentDarkMode  })
      .eq('userid', userId?.id)
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