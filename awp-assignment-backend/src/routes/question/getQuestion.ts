import { Db } from 'mongodb'
import { Express } from 'express'
import Question from '../../types/Question'
import mapQuestion from '../../utils/mapQuestion'

const getQuestion = (app: Express, db: Db) => {
    app.get('/get-question/:questionId', async (req, res) => {
        const { questionId } = req.params

        const questionsCol = db.collection<Question>('questions')

        const question = await questionsCol.findOne({ _id: questionId })

        res.json(mapQuestion(question))
    })
}

export default getQuestion
