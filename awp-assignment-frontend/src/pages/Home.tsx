import { RouteComponentProps } from '@reach/router'
import { useEffect, useState } from 'react'
import Heading from '../components/Heading'
import Api from '../services/Api'
import WishBuble from '../components/WishBuble'
import Wish from '../types/Wish'

const Home = (props: RouteComponentProps) => {
  const [wishes, setWishes] = useState<Wish[] | null>()
  const [loading, setLoading] = useState(true)

  const fetchAuctions = async () => {
    try {
      const wishes = await Api.getWishes()
      wishes.sort((a: Wish, b: Wish) => {
        return (
          new Date(b.timeCreated).getTime() - new Date(a.timeCreated).getTime()
        )
      })
      setWishes(wishes)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAuctions()
  }, [])

  return (
    <div>
      <Heading>My cool Wishlister app</Heading>
      <p>This is my wishlister app, hope you like it.</p>
      {!loading &&
        wishes?.map(wish => (
          <WishBuble key={wish.wishId} isLink={true} {...wish} />
        ))}
    </div>
  )
}

export default Home
