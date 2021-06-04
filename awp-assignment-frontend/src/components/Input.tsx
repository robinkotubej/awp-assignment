import { InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { COLOR } from '../constants'
import ErrorSVG from '../icons/ErrorSVG'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const Input = ({ label, error, ...props }: Props) => (
  <Container>
    <LabelRow>
      <Label>{label}</Label>

      {error && (
        <ErrorMessage>
          {error}
          <ErrorSVG />
        </ErrorMessage>
      )}
    </LabelRow>
    <StyledInput error={error} {...props} />
  </Container>
)

const Container = styled.div`
  margin-bottom: 30px;
`
const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Label = styled.p`
  margin-bottom: 6px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
  color: #444;
  letter-spacing: 1px;
`
const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: ${COLOR.RED};
  font-weight: 600;
`
const StyledInput = styled.input<{ error?: string }>`
  width: 400px;
  height: 50px;
  border-radius: 8px;
  font-size: 14px;
  padding: 0 14px;
  background: #eee;
  color: #444;
  border: 1px solid ${props => (props.error ? COLOR.RED : '#eee')};
`

export default Input
