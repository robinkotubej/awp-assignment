import { RouteComponentProps, navigate } from '@reach/router'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import WishComment from '../components/WishComment'
import WishBuble from '../components/WishBuble'
import CreateComment from '../components/CreateComment'
import Api from '../services/Api'
import { useAuth } from '../services/Auth'
import Wish from '../types/Wish'
import Comment from '../types/Comment'

interface WishProps extends RouteComponentProps {
  ownerId?: string
  wishId?: string
}

const WishDetail = ({ ownerId, wishId }: WishProps) => {
  const [wish, setWish] = useState<Wish | undefined>()
  const [loading, setLoading] = useState(true)
  const { openErrorModal } = useAuth()

  useEffect(() => {
    const fetchProduct = async () => {
      if (wishId && ownerId) {
        try {
          const wish = await Api.getWish(ownerId, wishId)
          wish.comments.sort((a: Comment, b: Comment) => {
            return (
              new Date(b.timeCreated).getTime() -
              new Date(a.timeCreated).getTime()
            )
          })
          setWish(wish)
          setLoading(false)
        } catch (error: any) {
          openErrorModal({
            message: error.message,
            btnMessage: 'Go back',
            onClose: () => {
              navigate('/', { replace: true })
            },
          })
          console.log(error)
        }
      }
    }
    fetchProduct()
  }, [wishId, wish?.wishId])

  return (
    <Container>
      {!loading && wish ? (
        <>
          <WishBuble {...wish} />
          {wish.comments?.map((comment: Comment) => (
            <WishComment key={comment._id} {...comment} />
          ))}
          <CreateComment
            ownerId={ownerId!}
            wishId={wish.wishId}
            setWish={setWish}
          />
        </>
      ) : (
        <p>loading...</p>
      )}
    </Container>
  )
}

const Container = styled.div``
export default WishDetail
