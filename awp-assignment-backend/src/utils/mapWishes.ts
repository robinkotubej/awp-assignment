import Wish from '../types/Wish'
import User from '../types/User'

const mapWishes = (user: User) =>
    user.wishes.map((wish: Wish) => {
        return {
            wishId: wish._id,
            ownerId: user._id,
            ownerName: user.username,
            timeCreated: wish.timeCreated,
            title: wish.title,
            description: wish.description,
            externalUrl: wish.externalUrl,
            comments: wish.comments,
        }
    })

export default mapWishes
