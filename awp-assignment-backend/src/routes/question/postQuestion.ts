import { Express, json } from 'express'
import { Db } from 'mongodb'
import Question from '../../types/Question'
import { v4 as uuid } from 'uuid'

interface Body {
    username: string
    question: string
}

const postQuestion = (app: Express, db: Db) => {
    app.post('/post-question', (req, res) => {
        const { username, question } = req.body as Body

        if (username.length === 0) {
            return res.send({ message: 'Username is required', error: true })
        }
        if (question.length === 0) {
            return res.send({ message: 'question is required', error: true })
        }
        if (question.length === 0 && username.length === 0) {
            return res.send({
                message: 'Question and username are required',
                error: true,
            })
        }
        const questionsCol = db.collection<Question>('questions')
        const newQuestion: Question = {
            _id: uuid(),
            timeCreated: new Date(),
            username,
            question,
            answers: [],
            updatedAt: null,
        }
        questionsCol.insertOne(newQuestion)
        res.send({ message: 'Question saved' })
    })
}
export default postQuestion
