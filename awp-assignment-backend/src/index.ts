import express from 'express'
import bodyParser from 'body-parser'
import { MongoClient } from 'mongodb'
import cors from 'cors'
import postQuestion from './routes/question/postQuestion'
import getQuestions from './routes/question/getQuestions'
import getQuestion from './routes/question/getQuestion'
import postAnswer from './routes/answer/postAnswer'
import rateAnswerUp from './routes/answer/rateAnswerUp'
import rateAnswerDown from './routes/answer/rateAnswerDown'
import createInitialQuestion from './utils/createInitialQuestions'

const app = express()
const port = 8080 // default port to listen

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

// create new db connection
new MongoClient('mongodb://localhost', options).connect().then(client => {
    // db name
    const db = client.db('awp-db')
    createInitialQuestion(db)
    // allow cors
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    // routes
    postQuestion(app, db)
    getQuestions(app, db)
    getQuestion(app, db)
    postAnswer(app, db)
    rateAnswerUp(app, db)
    rateAnswerDown(app, db)

    // start the Express server
    app.listen(port, () => {
        // tslint:disable-next-line:no-console
        console.log(`server started at http://localhost:${port} `)
    })
})
