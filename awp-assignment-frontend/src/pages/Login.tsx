import { RouteComponentProps } from '@reach/router'
import { useState } from 'react'
import styled from 'styled-components'
import Heading from '../components/Heading'
import Input from '../components/Input'
import PrimaryButton from '../components/PrimaryButton'
import { EMAILREGEX } from '../constants'
import Api from '../services/Api'
import { useAuth } from '../services/Auth'
import decodeJWT from '../services/decodeJWT'

const Login = (props: RouteComponentProps) => {
  const { login } = useAuth()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [passError, setPassError] = useState<string>('')

  const handleEmailError = () => {
    if (emailError) {
      if (EMAILREGEX.test(email)) {
        setEmailError('')
        return
      }
    }
  }
  const handlePassError = () => {
    if (passError) {
      if (password.length > 2) {
        setPassError('')
        return
      }
    }
  }

  const handleLogin = async (email: string, password: string) => {
    if (!EMAILREGEX.test(email)) {
      setEmailError('Write right email')
    } else if (password.length < 2) {
      setPassError('Missing password')
    } else {
      const res = await Api.authorizeUser(email, password)
      if (res.emptyErr) {
        setEmailError('Missing email')
        setPassError('Missing password')
      } else if (res.passErr) {
        setPassError(res.passErr)
      } else if (res.mailErr) {
        setEmailError(res.mailErr)
      } else if (res.token) {
        const { userId, username } = decodeJWT(res.token)
        login(userId, username, res.token)
      }
    }
  }
  return (
    <Container>
      <Heading>Please Login</Heading>
      <Input
        label="Email"
        onChange={e => {
          setEmail(e.target.value)
          handleEmailError()
        }}
        error={emailError}
      />
      <Input
        label="Password"
        type="password"
        onChange={e => {
          setPassword(e.target.value)
          handlePassError()
        }}
        error={passError}
      />
      <PrimaryButton
        text="Submit"
        onClick={() => handleLogin(email, password)}
      />
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  width: 800px;
  padding: 64px 64px;
  margin: 64px auto;
  border-radius: 48px;
  box-shadow: 2px 0px 32px rgba(0, 0, 0, 0.05);
`

export default Login
