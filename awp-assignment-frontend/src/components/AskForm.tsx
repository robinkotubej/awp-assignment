import { FormEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { COLOR } from '../constants'
import Api from '../services/Api'
import { useAuth } from '../services/Auth'

const AskForm = () => {
  const [username, setUsername] = useState<string>('')
  const [userMessage, setUserMessage] = useState<string>('')
  const { loggedIn } = useAuth()
  const [message, setMessage] = useState<{
    message: string
    error?: boolean
  }>({ message: `Post your Question` })

  const handlePost = async (event: FormEvent) => {
    event.preventDefault()
    const data = await Api.postQuestion(username, userMessage)
    setMessage(data)
  }
  useEffect(() => {
    if (!loggedIn) {
      setMessage({ error: true, message: 'Please login' })
    }
  }, [loggedIn])

  return (
    <Container>
      <Message error={message.error || false}>{message.message}</Message>

      <StyledForm onSubmit={event => handlePost(event)}>
        <NameInput
          type="text"
          placeholder="Username:"
          value={username}
          onChange={e => setUsername(e.target.value)}
          disabled={!loggedIn}
        />
        <TextInput
          rows={5}
          placeholder="Question:"
          value={userMessage}
          onChange={e => setUserMessage(e.target.value)}
          disabled={!loggedIn}
        />
        <Submit type="submit" disabled={!loggedIn} />
      </StyledForm>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 340px;
  margin-top: 50px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
`

const Message = styled.h4<{ error: boolean }>`
  font-size: 24px;
  margin-top: 0px;
  color: ${props => (props.error ? COLOR.RED : '#a9a9a9')};
`
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const NameInput = styled.input`
  font-size: 18px;
  padding: 6px;
  margin-bottom: 10px;
  border: solid 2px ${COLOR.GREEN};
  border-radius: 6px;
  outline: none;

  :focus {
    box-shadow: ${COLOR.HOVER.GREEN}33 0px 1px 16px;
  }
`
const TextInput = styled.textarea`
  font-size: 18px;
  padding: 6px;
  border: solid 2px ${COLOR.GREEN};
  border-radius: 6px;
  outline: none;

  :focus {
    box-shadow: ${COLOR.HOVER.GREEN}33 0px 1px 16px;
  }
`
const Submit = styled.input`
  padding: 8px 12px;
  align-self: flex-end;
  margin-top: 20px;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 16px;
  color: ${COLOR.GREEN};
  border: solid 2px ${COLOR.GREEN};
  border-radius: 6px;
  cursor: pointer;
  outline: none;
  background-color: #fff;
  :hover {
    color: ${COLOR.HOVER.GREEN};
    border-color: ${COLOR.HOVER.GREEN};
  }

  :active {
    color: ${COLOR.ACTIVE.GREEN};
    border-color: ${COLOR.ACTIVE.GREEN};
  }
`

export default AskForm
