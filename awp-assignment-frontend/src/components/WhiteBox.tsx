import styled from 'styled-components'
import { FC } from 'react'

const WhiteBox: FC = ({ children }) => {
  return <Container>{children}</Container>
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  width: 860px;
  padding: 64px 64px;
  margin: 64px auto;
  border-radius: 48px;
  box-shadow: 2px 0px 32px rgba(0, 0, 0, 0.05);
`

export default WhiteBox
