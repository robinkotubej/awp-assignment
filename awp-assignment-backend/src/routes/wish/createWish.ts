import { Express } from 'express'
import { Db } from 'mongodb'
import Wish from '../../types/Wish'
import { v4 as uuid } from 'uuid'
import User from '../../types/User'

interface Body {
    title: string
    description?: string
    externalUrl?: string
}

interface UserH {
    userId: string
}

const createWish = (app: Express, db: Db) => {
    app.post('/create-wish', async (req, res) => {
        const { title, description, externalUrl } = req.body as Body

        const { userId } = req.user as UserH

        if (title.length <= 3) {
            return res.json({ error: 'Title is required, min 4 cahrs' })
        }

        const usersCol = db.collection<User>('users')
        const wishId = uuid()
        const newWish: Wish = {
            _id: wishId,
            timeCreated: new Date(),
            title,
            description,
            externalUrl,
            comments: [],
        }

        await usersCol.findOneAndUpdate(
            { _id: userId },
            { $push: { wishes: newWish } },
            { returnOriginal: false }
        )

        res.send({ userId, wishId })
    })
}

export default createWish
