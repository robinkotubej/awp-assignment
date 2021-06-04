import { InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { COLOR } from '../constants'

interface Props extends InputHTMLAttributes<HTMLButtonElement> {
  text: string
  onClick: () => void
}
const PrimaryButton = ({ text, onClick }: Props) => (
  <Container type="submit" onClick={onClick}>
    {text}
  </Container>
)

const Container = styled.button`
  width: 400px;
  height: 50px;
  background: ${COLOR.GREEN};
  border-color: ${COLOR.GREEN};
  color: #fff;
  display: flex;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  letter-spacing: 1px;
  transition: 100ms;
  border-style: none;

  :hover {
    background: ${COLOR.HOVER.GREEN};
  }

  :active {
    background: ${COLOR.ACTIVE.GREEN};
  }
`

export default PrimaryButton
