import { RouteComponentProps } from '@reach/router'
import styled from 'styled-components'
import Heading from '../components/Heading'
import Input from '../components/Input'
import PrimaryButton from '../components/PrimaryButton'

const Login = (props: RouteComponentProps) => {
  return (
    <Container>
      <Heading>Please Login</Heading>
      <Input label="Username" />
      <Input label="Password" type="password" />
      <PrimaryButton text="Submit" />
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
