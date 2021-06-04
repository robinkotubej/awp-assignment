import { useState, useEffect, createContext, useContext, FC } from 'react'
import Api from './Api'
import decodeJWT from './decodeJWT'

interface Credentials {
  userId: string | null
  username: string | null
  accessToken: string | null
}

interface Auth {
  loggedIn: boolean | null
  userId: string | null
  username: string | null
  accessToken: string | null
  login: (userId: string, accessToken: string, username: string) => void

  logout: () => void
}

export const AuthContext = createContext<Auth>({
  loggedIn: null,
  userId: null,
  username: null,
  accessToken: null,

  login: () => {},
  logout: () => {},
})
export const useAuth = () => useContext(AuthContext)

export const AuthProvider: FC = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [credentials, setCredentials] = useState<Credentials | null>(null)

  if (!credentials && typeof window !== 'undefined') {
    const username = localStorage.getItem('username')
    const userId = localStorage.getItem('userId')
    const accessToken = localStorage.getItem('token')
    setCredentials({ userId, username, accessToken })
  }

  useEffect(() => {
    if (!credentials) return

    const { accessToken, userId } = credentials
    if (accessToken === null) {
      setLoggedIn(false)
      return
    }
    const { exp } = decodeJWT(accessToken)

    if (exp && userId) {
      console.log(Date.now() > exp * 1000)
      console.log(new Date(exp * 1000))
      console.log(new Date(Date.now()))
      if (exp < Date.now() / 1000) {
        Api.renewToken(userId, accessToken).then(token => {
          const { userId, username } = decodeJWT(token)
          login(userId, username, token)
        })
      }
    }
    setLoggedIn(true)
  }, [credentials])

  const login = (userId: string, username: string, accessToken: string) => {
    localStorage.setItem('userId', userId)
    localStorage.setItem('username', username)
    localStorage.setItem('token', accessToken)

    setCredentials({ userId, username, accessToken })
  }

  const logout = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
    localStorage.removeItem('token')

    setCredentials({ userId: null, username: null, accessToken: null })
  }

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        userId: credentials?.userId || null,
        username: credentials?.username || null,
        accessToken: credentials?.accessToken || null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
