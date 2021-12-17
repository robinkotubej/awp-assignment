import { Express } from 'express'
import { Db } from 'mongodb'
import Wish from '../../types/Wish'
import User from '../../types/User'

const getUserComplete = (app: Express, db: Db) => {
    app.get('/api/get-user-complete/:userId', async (req, res) => {
        const { userId } = req.params

        const usersCol = db.collection<User>('users')
        const user = await usersCol.findOne({ _id: userId })

        if (!user) {
            return res.status(404).send({ error: 'User not found' })
        }

        const mappedUser = {
            userId: user._id,
            username: user.username,
            timeRegistered: user.timeRegistered,
            wishes: user.wishes.map((wish: Wish) => ({
                wishId: wish._id,
                ownerId: userId,
                ownerName: user.username,
                timeCreated: wish.timeCreated,
                title: wish.title,
                description: wish.description,
                comments: wish.comments,
            })),
        }
        res.json(mappedUser)
    })
}

export default getUserComplete
