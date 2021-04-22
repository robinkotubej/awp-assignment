import styled from 'styled-components'
import { FC } from 'react'

const Heading: FC = ({ children }) => {
  return <Container>{children}</Container>
}

const Container = styled.h2`
  font-size: 20px;
  margin-bottom: 16px;
`

export default Heading
