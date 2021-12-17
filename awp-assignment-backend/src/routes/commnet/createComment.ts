import { Express } from 'express'
import { Db } from 'mongodb'
import Comment from '../../types/Comment'
import { v4 as uuid } from 'uuid'
import User from '../../types/User'
import Wish from '../../types/Wish'

interface CreateCommentProps {
    username: string
    comment: string
}

const createComment = (app: Express, db: Db) => {
    app.post('/api/create-comment/:ownerId/:wishId', async (req, res) => {
        const { username, comment } = req.body as CreateCommentProps
        const { wishId, ownerId } = req.params

        if (username.length < 3 || !username) {
            return res.status(400).send({
                usernameErr: 'required & must be longer than 3',
            })
        }

        if (comment.length < 3 || !comment) {
            return res.status(400).send({
                commentErr: 'required & must be longer than 3',
            })
        }

        const usersCol = db.collection<User>('users')

        const owner = await usersCol.findOne({ _id: ownerId })

        if (!owner) {
            return res.status(404).send({ error: 'Owner not found' })
        }

        const wish = owner.wishes.find((wish: Wish) => wish._id === wishId)

        if (!wish) {
            return res.status(404).send({ error: 'Wish not found' })
        }

        const newComment: Comment = {
            _id: uuid(),
            timeCreated: new Date(),
            username,
            comment,
        }

        const { value: updatedUser } = await usersCol.findOneAndUpdate(
            { _id: ownerId, 'wishes._id': wishId },
            { $push: { 'wishes.$.comments': newComment } },
            { returnOriginal: false }
        )

        const updatedWish = updatedUser.wishes.find(
            (wish: Wish) => wish._id === wishId
        )
        res.send({ ...updatedWish })
    })
}

export default createComment
