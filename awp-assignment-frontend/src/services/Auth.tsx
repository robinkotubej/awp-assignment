import { useState, useEffect, createContext, useContext, FC } from 'react'
import Api from './Api'
import decodeJWT from './decodeJWT'
import AlertModal from '../components/AlertModal'

interface Credentials {
  userId: string | null
  username: string | null
  accessToken: string | null
}
interface ErrorModalProps {
  message: string
  btnMessage: string
  onClose: () => void
}

interface Auth {
  loggedIn: boolean | null
  userId: string | null
  username: string | null
  accessToken: string | null
  login: (userId: string, accessToken: string, username: string) => void
  logout: () => void
  openErrorModal: (props: ErrorModalProps) => void
}

export const AuthContext = createContext<Auth>({
  loggedIn: null,
  userId: null,
  username: null,
  accessToken: null,
  login: () => {},
  logout: () => {},
  openErrorModal: () => {},
})
export const useAuth = () => useContext(AuthContext)

export const AuthProvider: FC = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [credentials, setCredentials] = useState<Credentials | null>(null)
  const [authError, setAuthError] = useState<ErrorModalProps | null>(null)

  if (!credentials && typeof window !== 'undefined') {
    const username = localStorage.getItem('username')
    const userId = localStorage.getItem('userId')
    const accessToken = localStorage.getItem('token')
    setCredentials({ userId, username, accessToken })
  }

  useEffect(() => {
    if (!credentials) return

    const { accessToken, userId } = credentials
    if (!accessToken || !userId) {
      setLoggedIn(false)
      return
    }
    const { exp } = decodeJWT(accessToken)

    if (exp && userId) {
      if (exp < Date.now() / 1000) {
        try {
          Api.renewToken(accessToken).then(res => {
            if (res.error) {
              const onClose = () => {
                logout()
                setAuthError(null)
              }
              setAuthError({
                message: res.error,
                btnMessage: 'Log out',
                onClose,
              })
              return
            }
            const { userId, username } = decodeJWT(res.accessToken!)
            login(userId, username, res.accessToken!)
          })
        } catch (error) {
          console.log(error)
        }
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
  const openErrorModal = ({
    btnMessage,
    message,
    onClose,
  }: ErrorModalProps) => {
    setAuthError({
      btnMessage,
      message,
      onClose: () => {
        onClose()
        setAuthError(null)
      },
    })
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
        openErrorModal,
      }}
    >
      {authError && <AlertModal {...authError} />}

      {children}
    </AuthContext.Provider>
  )
}
