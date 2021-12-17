import moment from 'moment'
import styled from 'styled-components'
import Comment from '../types/Comment'
import UserBubble from './UserBubble'

const WishComment = ({ comment, username, timeCreated }: Comment) => {
  return (
    <Container>
      <Row>
        <Row>
          <Title>User:</Title>
          <UserBubble align="left" userName={username} />
        </Row>
        <div>
          <Title>Bid submited on:</Title>
          {moment(timeCreated).format('LLL')}
        </div>
      </Row>
      <CommentWrapper></CommentWrapper>
      <Title>Comment:</Title>
      {comment}
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
  width: 860px;
  padding: 20px 44px 64px;
  margin: 64px auto;
  border-radius: 48px;
  box-shadow: 2px 0px 32px rgba(0, 0, 0, 0.05);
`
const Title = styled.h4`
  margin: 0;
  color: #aaa;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const CommentWrapper = styled.div`
  margin-top: 50px;
`

export default WishComment
