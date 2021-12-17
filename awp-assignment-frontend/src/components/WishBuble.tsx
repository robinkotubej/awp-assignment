import styled from 'styled-components'
import moment from 'moment'
import Product from '../types/Wish'
import UserBubble from './UserBubble'
import { Link, navigate } from '@reach/router'
import PrimaryButton from './PrimaryButton'

interface WishBubleProps extends Product {
  isLink?: boolean
}

const WishBuble = ({
  wishId,
  comments,
  timeCreated,
  externalUrl,
  title,
  description,
  ownerName,
  ownerId,
  isLink,
}: WishBubleProps) => {
  const includesHttp = externalUrl?.includes('http')

  return (
    <Container
      isLink={isLink}
      onClick={() => {
        isLink && navigate(`/wish/${ownerId}/${wishId}`)
      }}
    >
      <Wrapper>
        <Title>Wish:</Title>
        <DateTime>
          <div>
            <div>{moment(timeCreated).format('LLL')}</div>
          </div>
        </DateTime>
      </Wrapper>
      <Name>{title}</Name>
      <Wrapper>
        {description && (
          <div>
            <Title>Description:</Title>
            <Description>{description}</Description>
          </div>
        )}
        {externalUrl && (
          <div>
            <Title>Extrenal link to product</Title>
            <PrimaryButton
              text="Open link"
              width={250}
              onClick={() => {
                window.open(
                  includesHttp ? externalUrl : 'http://' + externalUrl,
                  '_blank'
                )
              }}
            />
          </div>
        )}
      </Wrapper>
      <Row>
        <OwnerWrapper>
          <Title>Owned by: </Title>
          <Link to={`/user/${ownerId}`}>
            <UserBubble align="left" userName={ownerName} />
          </Link>
        </OwnerWrapper>
        {isLink && (
          <Row>
            <Title>Number of comments: </Title>
            {' ' + comments.length}
          </Row>
        )}
      </Row>
    </Container>
  )
}

const Container = styled.div<{ sold?: boolean; isLink?: boolean }>`
  display: flex;
  flex-direction: column;
  background: #fff;
  width: 860px;
  padding: 32px 64px;
  margin: 32px auto;
  border-radius: 48px;
  box-shadow: 2px 0px 32px rgba(0, 0, 0, 0.05);
  opacity: ${props => (props.sold ? '50%' : '100%')};
  cursor: ${props => (props.isLink ? 'pointer' : 'initial')};

  :hover {
    box-shadow: ${prosp =>
      prosp.isLink
        ? '2px 0px 32px rgba(0, 0, 0, 0.2)'
        : '2px 0px 32px rgba(0, 0, 0, 0.05)'};
  }
`

const DateTime = styled.span`
  font-size: 16px;
  font-style: italic;
  color: #bbb;
  align-self: flex-end;
  text-align: center;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`

const Title = styled.h4`
  margin: 0;
  color: #aaa;
`
const Name = styled.h2`
  margin-top: 5px;
  margin-bottom: 40px;
`
const Description = styled.p`
  margin-top: 5px;
  max-width: 560px;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const OwnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export default WishBuble
