import { RouteComponentProps, navigate } from '@reach/router'
import moment from 'moment'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import WishBuble from '../components/WishBuble'
import Heading from '../components/Heading'
import UserBubble from '../components/UserBubble'
import WhiteBox from '../components/WhiteBox'
import Api from '../services/Api'
import { useAuth } from '../services/Auth'
import Wish from '../types/Wish'
import User from '../types/User'

interface UserProfileProps extends RouteComponentProps {
  userId?: string
}

const UserProfile = ({ userId }: UserProfileProps) => {
  const [user, setUser] = useState<User | undefined>()
  const [loading, setLoading] = useState(true)
  const { openErrorModal } = useAuth()
  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const user = await Api.getUserComplete(userId)

          setUser(user)
          setLoading(false)
        } catch (error: any) {
          openErrorModal({
            message: error.message,
            btnMessage: 'Go back',
            onClose: () => {
              navigate('/', { replace: true })
            },
          })
          console.log(error)
        }
      }
    }
    fetchUser()
    // eslint-disable-next-line
  }, [userId])
  return (
    <Container>
      <WhiteBox>
        <Heading>User information</Heading>
        {!loading && user && (
          <>
            <div>
              <Title>User: </Title>
              <Column>
                <UserBubble align="left" userName={user.username} />
                <Username> {user.username}</Username>
              </Column>
            </div>
            <div>
              <Title>User joind us</Title>
              <p>{moment(user.timeRegistered).format('YYYY/M/D HH:MM')}</p>
            </div>
          </>
        )}
      </WhiteBox>
      {!loading &&
        user?.wishes?.map((wish: Wish) => (
          <WishBuble
            key={wish.wishId}
            {...wish}
            isLink={true}
            ownerId={user.userId}
          />
        ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  font-size: 20px;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Username = styled.p`
  margin-left: 10px;
`

export default UserProfile
