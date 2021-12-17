import Wish from './Wish'

interface User {
    _id: string
    timeRegistered: Date
    username: string
    email: string
    password: string
    wishes: Wish[] | []
}
export default User
