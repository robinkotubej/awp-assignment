import { Db } from 'mongodb'
import { Express } from 'express'
import User from '../../types/User'
import bcrypt from 'bcryptjs'
import { SECRET } from '../../constants'
import jwt from 'jsonwebtoken'

const renewToken = (app: Express, db: Db) => {
    app.post('/oauth/renewToken', async (req, res) => {
        const { userId } = req.body

        if (!userId) {
            res.status(401).json({ error: 'Missing user id ' })
            return
        }

        const usersCol = db.collection<User>('users')

        const user = await usersCol.findOne({ _id: userId })
        if (!userId) {
            res.status(404).json({ error: 'User not found' })
            return
        }

        const payload = { username: user.username, userId: user._id }
        const token = jwt.sign(payload, SECRET, {
            algorithm: 'HS512',
            expiresIn: '1h',
        })

        res.json({ token })
    })
}

export default renewToken
