import Comment from './Comment'
interface Wish {
    _id: string
    timeCreated: Date
    title: string
    description?: string
    externalUrl?: string
    comments: Comment[] | []
}
export default Wish
