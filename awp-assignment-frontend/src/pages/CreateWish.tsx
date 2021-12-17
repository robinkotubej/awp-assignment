import styled from 'styled-components'
import { navigate, RouteComponentProps } from '@reach/router'
import Heading from '../components/Heading'

import WhiteBox from '../components/WhiteBox'
import Input from '../components/Input'
import TextArea from '../components/TextArea'
import PrimaryButton from '../components/PrimaryButton'
import { useAuth } from '../services/Auth'
import { useState } from 'react'
import Api from '../services/Api'

const CreateWish = (props: RouteComponentProps) => {
  const { accessToken, openErrorModal } = useAuth()
  const [title, setTitle] = useState<string>('')
  const [titleErr, setTitleErr] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [externalUrl, setExternalUrl] = useState<string>('')

  const handleTitleFill = () => {
    if (title.length === 0) {
      return setTitleErr('Title is required')
    } else if (title.length < 3) {
      return setTitleErr('Titile has to be longer')
    } else {
      return setTitleErr('')
    }
  }

  const handleSubmit = async () => {
    handleTitleFill()

    if (!accessToken) {
      return openErrorModal({
        btnMessage: 'Log in ',
        message: 'You are not authorised to create an auction, please log in ',
        onClose: () => {
          navigate('/login')
        },
      })
    }
    if (!titleErr && accessToken) {
      try {
        const res = await Api.createWish(
          accessToken,
          title,
          description,
          externalUrl
        )

        navigate(`/wish/${res.userId}/${res.wishId}`)
      } catch (error) {
        const err = error as any
        openErrorModal({
          btnMessage: 'close',
          message: err.error,
          onClose: () => {},
        })
      }
    }
  }

  return (
    <WhiteBox>
      <Heading>Create Wish</Heading>
      <p>Please fill in the form to create new wish.</p>
      <Form
        onSubmit={e => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <Input
          label="Product Title"
          onChange={e => {
            setTitle(e.target.value)
            handleTitleFill()
          }}
          error={titleErr}
        />
        <Input
          label="External link"
          type="text"
          onChange={e => {
            setExternalUrl(e.target.value)
          }}
          error={externalUrl}
        />
        <TextArea
          label="Product description"
          rows={6}
          onChange={e => {
            setDescription(e.target.value)
          }}
          error={description}
        />
        <PrimaryButton text="Create" />
      </Form>
    </WhiteBox>
  )
}

const Form = styled.form``

export default CreateWish
