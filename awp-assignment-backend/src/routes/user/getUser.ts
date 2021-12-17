import { Express } from 'express'
import { Db } from 'mongodb'
import User from '../../types/User'

const getUser = (app: Express, db: Db) => {
    app.get('/api/get-user/:userId', async (req, res) => {
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
        }
        res.json(mappedUser)
    })
}

export default getUser
