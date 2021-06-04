import { Db } from 'mongodb'
import { Express } from 'express'
import User from '../../types/User'
import bcrypt from 'bcryptjs'
import { SECRET } from '../../constants'
import jwt from 'jsonwebtoken'

const login = (app: Express, db: Db) => {
    app.post('/oauth/authorize', async (req, res) => {
        const { email, password } = req.body
        // tslint:disable-next-line:no-console
        console.log(email, password)
        if (!email || !password) {
            res.status(401).json({ emptyErr: 'Email or password missing!' })
            return
        }

        const usersCol = db.collection<User>('users')

        const user = await usersCol.findOne({ email })
        if (user) {
            // If the user is found
            if (bcrypt.compareSync(password, user.password)) {
                const payload = { username: user.username, userId: user._id }
                const token = jwt.sign(payload, SECRET, {
                    algorithm: 'HS512',
                    expiresIn: '1h',
                })

                res.json({
                    msg: `User '${user.username}' authenticated successfully`,
                    token,
                })
            } else {
                res.status(401).json({ passErr: 'Password mismatch!' })
            }
        } else {
            res.status(404).json({ mailErr: 'Incorrect email adress!' })
        }
    })
}

export default login
