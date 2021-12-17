import { Db } from 'mongodb'
import { Express } from 'express'
import User from '../../types/User'
import bcrypt from 'bcryptjs'
import { SECRET } from '../../constants'
import jwt from 'jsonwebtoken'

interface UserH {
    userId: string
}

const renewToken = (app: Express, db: Db) => {
    app.post('/oauth/renewToken', async (req, res) => {
        const { userId } = req.user as UserH

        const payload = { userId }
        const newToken = jwt.sign(payload, SECRET, {
            algorithm: 'HS512',
            expiresIn: '1h',
        })

        res.status(401).json({ accessToken: newToken })
    })
}

export default renewToken
