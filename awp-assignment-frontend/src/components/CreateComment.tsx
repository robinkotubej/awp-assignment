import { useState } from 'react'
import styled from 'styled-components'
import Api from '../services/Api'
import Wish from '../types/Wish'
import Heading from './Heading'
import Input from './Input'
import PrimaryButton from './PrimaryButton'
import TextArea from './TextArea'
import WhiteBox from './WhiteBox'

interface CreatCommentProps {
  ownerId: string
  wishId: string
  setWish: (wish: Wish) => void
}

const CreateComment = ({ ownerId, wishId, setWish }: CreatCommentProps) => {
  const [comment, setComment] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [usernameErr, setUsernameErr] = useState<string>('')
  const [commentErr, setCommentErr] = useState<string>('')

  const handleInput = (
    value: string,
    setInput: (val: string) => void,
    setInputErr: (val: string) => void
  ) => {
    setInput(value)
    if (value.length === 0) {
      return setInputErr('Field is required')
    } else if (value.length < 3) {
      return setInputErr('Field has to be longer')
    } else {
      return setInputErr('')
    }
  }

  const handleSubmit = async () => {
    if (usernameErr || commentErr) return
    try {
      const wish = await Api.createComment(ownerId, wishId, username, comment)
      setWish(wish)
      setComment('')
      setUsername('')
    } catch (error: any) {
      if (error.commentErr) {
        setCommentErr(error.commentErr)
      } else if (error.usernameErr) {
        setUsernameErr(error.usernameErr)
      }
    }
  }

  return (
    <WhiteBox>
      <Heading>Submit your comment</Heading>
      <From
        onSubmit={async e => {
          e.preventDefault()
          await handleSubmit()
        }}
      >
        <Input
          label="Username"
          type="text"
          onChange={e => {
            handleInput(e.target.value, setUsername, setUsernameErr)
          }}
          value={username}
          error={usernameErr}
        />
        <TextArea
          label="Commment"
          rows={6}
          onChange={e => {
            handleInput(e.target.value, setComment, setCommentErr)
          }}
          value={comment}
          error={commentErr}
        />
        <PrimaryButton text="Submit" />
      </From>
    </WhiteBox>
  )
}

const From = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export default CreateComment
