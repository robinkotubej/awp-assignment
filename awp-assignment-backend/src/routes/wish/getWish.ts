import { Express } from 'express'
import { Db } from 'mongodb'
import User from '../../types/User'
import Wish from '../../types/Wish'

const getWish = (app: Express, db: Db) => {
    app.get('/api/get-wish/:userId/:wishId', async (req, res) => {
        const { userId, wishId } = req.params

        const usersCol = db.collection<User>('users')

        const user = await usersCol.findOne({ _id: userId })

        if (!user) {
            return res.status(404).send({ error: 'User not found' })
        }
        const wish = user.wishes.find((wish: Wish) => wish._id === wishId)

        if (!wish) {
            return res.status(404).send({ error: 'Wish not found' })
        }
        const mappedWish = {
            wishId: wish._id,
            timeCreated: wish.timeCreated,
            title: wish.title,
            ownerName: user.username,
            ownerId: userId,
            description: wish.description,
            externalUrl: wish.externalUrl,
            comments: wish.comments,
        }

        res.json(mappedWish)
    })
}

export default getWish
