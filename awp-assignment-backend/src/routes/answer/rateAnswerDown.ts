import { Express, json } from 'express'
import { Db } from 'mongodb'
import Question from '../../types/Question'

import mapQuestion from '../../utils/mapQuestion'

const rateAnswerDown = (app: Express, db: Db) => {
    app.post('/rate-answer-down/:questionId/:answerId', async (req, res) => {
        const { questionId, answerId } = req.params

        const questionsCol = db.collection<Question>('questions')
        const { value: updatedQuestion } = await questionsCol.findOneAndUpdate(
            { _id: questionId, 'answers.answerId': answerId },
            {
                $inc: { 'answers.$.downVoteCount': 1 },
                $set: { 'answers.$.updatedAt': new Date() },
            },
            { returnOriginal: false }
        )

        if (!updatedQuestion) return res.send({ message: 'Question not found' })

        res.json(mapQuestion(updatedQuestion))
    })
}
export default rateAnswerDown
