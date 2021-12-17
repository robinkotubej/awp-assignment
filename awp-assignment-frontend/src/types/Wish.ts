import Comment from './Comment'

interface Wish {
  wishId: string
  ownerId: string
  ownerName: string
  timeCreated: Date
  title: string
  description?: string
  externalUrl?: string
  comments: Comment[] | []
}

export default Wish
