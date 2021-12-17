import { navigate, RouteComponentProps } from '@reach/router'
import { useState } from 'react'
import styled from 'styled-components'
import Heading from '../components/Heading'
import Input from '../components/Input'
import PrimaryButton from '../components/PrimaryButton'
import WhiteBox from '../components/WhiteBox'
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

  const handleLogin = async () => {
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
        navigate('/', { replace: true })
      }
    }
  }
  return (
    <WhiteBox>
      <Heading>Please Login</Heading>
      <From
        onSubmit={e => {
          e.preventDefault()
          handleLogin()
        }}
      >
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
        <PrimaryButton text="Submit" />
      </From>
    </WhiteBox>
  )
}
const From = styled.form``
export default Login
