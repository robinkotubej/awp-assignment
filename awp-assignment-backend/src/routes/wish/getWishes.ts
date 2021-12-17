import { Express } from 'express'
import { Db } from 'mongodb'
import mapWishes from '../../utils/mapWishes'
import User from '../../types/User'

const getWishes = (app: Express, db: Db) => {
    app.get('/api/get-wishes', async (req, res) => {
        const usersCol = db.collection<User>('users')

        const users = await usersCol.find({}).toArray()

        res.json(...users.map(mapWishes))
    })
}

export default getWishes
