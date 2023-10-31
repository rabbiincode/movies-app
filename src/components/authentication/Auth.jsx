import { useEffect, useCallback, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { register, Hanko } from "@teamhanko/hanko-elements"
import './auth.css'
const hankoApi = 'https://d702bb39-febc-4ec3-a339-b6e5c89dd7be.hanko.io'
const user = new Hanko(hankoApi)

const Auth = () => {
  const navigate = useNavigate()
  const hanko = useMemo(() => user, [])

  const redirectAfterLogin = useCallback(() => {
    navigate('/')
  }, [navigate])

  useEffect(() =>
    hanko.onAuthFlowCompleted(() => {
      redirectAfterLogin()
    }),
    [hanko, redirectAfterLogin]
  )

  useEffect(() => {
    register(hankoApi).catch((error) => {
      // handle error
      error
    })
    user.onSessionExpired(() => navigate('/auth'))
  }, [navigate])

  return (
    <div className='auth' style={{ backgroundImage: `url(https://rb.gy/p2hphi)` }}>
      <span>MovieBox</span>
      <hanko-auth id="hankoAuth"/>
    </div>
  )
}

export {Auth, user}