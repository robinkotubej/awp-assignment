import styled from 'styled-components'
import { Link } from '@reach/router'
import { useAuth } from '../services/Auth'
import UserBubble from './UserBubble'

const ProfileLink = () => {
  const { username, userId } = useAuth()

  return (
    <Container>
      <Link to={`/user/${userId}`}>
        <Wrapper>
          <UserBubble align="initial" userName={username ? username : 'np'} />
          <Name>{username}</Name>
        </Wrapper>
      </Link>
    </Container>
  )
}
const Container = styled.div`
  margin-left: 15px;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 32px;
  opacity: 0.85;

  :hover {
    opacity: 1;
  }
`

const Name = styled.p`
  font-size: 16px;
  color: #fff;
  font-weight: 400;
  white-space: nowrap;
`

export default ProfileLink
