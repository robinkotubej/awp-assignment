import bcrypt from 'bcryptjs'
import { Db } from 'mongodb'
import User from '../types/User'
import { v4 as uuid } from 'uuid'

const createInitialUsers = (db: Db) => {
    const users: User[] = [
        // These are just some test users with passwords.
        // The passwords are in clear text for testing purposes (don't do this in production).
        {
            _id: uuid(),
            username: 'Elonko',
            email: 'robinkotubej@gmail.com',
            password: '1234',
            timeRegistered: new Date(),
        },
    ]

    // We run through all users and hash their password.
    // Ideally, this should happen only in POST /api/users/ when signing up a new user,
    // or in PUT /api/users/ when changing the password.
    users.forEach(async user => {
        const hashedPassword: string = await new Promise((resolve, reject) => {
            bcrypt.hash(user.password, 10, (err, hash) => {
                if (err) reject(err)
                else resolve(hash)
            })
        })

        user.password = hashedPassword // Storing the hash+salt on the user object.
        const usersCol = db.collection<User>('users')
        const usersF = await usersCol.find({}).toArray()
        if (usersF.length === 0) {
            usersCol.insertOne(user)
        }
    })
}

export default createInitialUsers
