import { Db } from 'mongodb'
import { Express } from 'express'
import Question from '../../types/Question'
import mapQuestion from '../../utils/mapQuestion'

const getQuestions = (app: Express, db: Db) => {
    app.get('/get-questions', async (req, res) => {
        const questionsCol = db.collection<Question>('questions')
        const questions = await questionsCol.find({}).toArray()
        res.json(questions.map(mapQuestion))
    })
}

export default getQuestions
