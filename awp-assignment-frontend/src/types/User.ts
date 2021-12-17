import Wish from './Wish'

interface User {
  userId: string
  username: string
  timeRegistered: Date
  wishes: Wish[] | []
}

export default User
