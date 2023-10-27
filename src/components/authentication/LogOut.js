import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
const hankoApi = process.env.REACT_APP_HANKO_API_URL

const LogOut = () => {
  const navigate = useNavigate()
  const [hanko, setHanko] = useState()

  useEffect(() => {
    import("@teamhanko/hanko-elements").then(({ Hanko }) =>
      setHanko(new Hanko(hankoApi ?? ""))
    )
  }, [])

  const logout = async () => {
    try{
      await hanko?.user.logout()
      navigate("/auth")
    } catch (error){
      console.error("Error during logout:", error)
    }
  }
  return logout
}

export const useLogout = () => {
  const logoutFunction = LogOut()
  return logoutFunction
}