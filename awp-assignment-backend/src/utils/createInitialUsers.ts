import bcrypt from 'bcryptjs'
import { Db } from 'mongodb'
import User from '../types/User'
import { v4 as uuid } from 'uuid'

const createInitialUsers = (db: Db) => {
    const users: User[] = [
        {
            _id: 'sdadas361654sda54dsa5ads64',
            username: 'Elonko',
            email: 'robinkotubej@gmail.com',
            password: '1234',
            timeRegistered: new Date(),
            wishes: [
                {
                    _id: uuid(),
                    timeCreated: new Date(),
                    title: 'My secret wish',
                    description: 'This is my spectial wish buy it for me',
                    externalUrl: 'www.baaa.dk',
                    comments: [
                        {
                            _id: uuid(),
                            timeCreated: new Date(),
                            username: 'Robin Kotubej',
                            comment: 'This is an amazing wish bro',
                        },
                    ],
                },
            ],
        },
    ]

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
