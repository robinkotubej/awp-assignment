import styled from 'styled-components'
import { COLOR } from '../constants'

interface Props {
  userName: string
  align: 'left' | 'right' | 'initial'
}

const UserBubble = ({ userName, align }: Props) => (
  <Container align={align}>
    {userName.charAt(0) + userName.charAt(userName.length - 1)}
  </Container>
)

const Container = styled.div<{ align: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  text-transform: uppercase;
  font-weight: 500;
  color: ${COLOR.GREEN};
  background-color: #fff;
  width: 40px;
  height: 40px;
  border: 2px solid ${COLOR.GREEN};
  border-radius: 50%;
  ${props => `margin-${props.align}: 10px;`}
`

export default UserBubble
