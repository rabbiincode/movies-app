import {useEffect, useState} from 'react'
import { user } from './Auth'

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState()

  useEffect(() => {
    // Get user details e.g userId and email
    const getUserDetails = async () => {
      try{
        const details = await user.user.getCurrent()
        setUserDetails(details)
      } catch{
        // console.error('Error fetching user details')
      }
    }
    getUserDetails()
  }, [userDetails])
  return userDetails
}

export default UserDetails