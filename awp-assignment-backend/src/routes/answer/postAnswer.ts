import { Express, json } from 'express'
import { Db } from 'mongodb'
import Question from '../../types/Question'
import { v4 as uuid } from 'uuid'
import Answer from '../../types/Answer'
import mapQuestion from '../../utils/mapQuestion'

interface Body {
    username: string
    answer: string
}

const postAnswer = (app: Express, db: Db) => {
    app.post('/post-answer/:questionId', async (req, res) => {
        const { questionId } = req.params
        const { username, answer } = req.body as Body

        if (username.length === 0) {
            return res.send({ message: 'Username is required', error: true })
        }
        if (answer.length === 0) {
            return res.send({ message: 'answer is required', error: true })
        }
        if (answer.length === 0 && username.length === 0) {
            return res.send({
                message: 'Answer and username are required',
                error: true,
            })
        }

        const newAnswer: Answer = {
            answerId: uuid(),
            timeCreated: new Date(),
            username,
            answer,
            upVoteCount: 0,
            downVoteCount: 0,
            updatedAt: null,
        }
        const questionsCol = db.collection<Question>('questions')
        const { value: updatedQuestion } = await questionsCol.findOneAndUpdate(
            { _id: questionId },
            { $push: { answers: newAnswer }, $set: { updatedAt: new Date() } },
            { returnOriginal: false }
        )
        if (!updatedQuestion) return res.send({ message: 'Question not found' })

        res.json(mapQuestion(updatedQuestion))
    })
}
export default postAnswer
