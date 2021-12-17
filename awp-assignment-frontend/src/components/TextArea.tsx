import { InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { COLOR } from '../constants'
import ErrorSVG from '../icons/ErrorSVG'

interface Props extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  rows?: number
}

const TextArea = ({ label, error, rows, ...props }: Props) => (
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
    <StyledTextarea error={error} {...props} rows={rows} />
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
const StyledTextarea = styled.textarea<{ error?: string }>`
  width: 400px;
  border-radius: 8px;
  font-size: 14px;
  padding: 14px 14px;
  background: #eee;
  color: #444;
  resize: none;
  border: 1px solid ${props => (props.error ? COLOR.RED : '#eee')};
`

export default TextArea
