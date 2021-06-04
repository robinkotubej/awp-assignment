import express from 'express'
import bodyParser from 'body-parser'
import { MongoClient } from 'mongodb'
import cors from 'cors'
import checkJwt from 'express-jwt'
import postQuestion from './routes/question/postQuestion'
import getQuestions from './routes/question/getQuestions'
import getQuestion from './routes/question/getQuestion'
import postAnswer from './routes/answer/postAnswer'
import rateAnswerUp from './routes/answer/rateAnswerUp'
import rateAnswerDown from './routes/answer/rateAnswerDown'
import createInitialQuestion from './utils/createInitialQuestions'
import { SECRET } from './constants'
import createInitialUsers from './utils/createInitialUsers'
import login from './routes/oauth/login'

const app = express()
const port = 8080 // default port to listen
app.use(cors())

const openPaths = [
    // Open everything that doesn't begin with "/api"
    /^(?!\/oauth).*/gim,
    // Open "/api/users/authenticate" for POST requests
    { url: '/oauth/authorize', methods: ['POST'] },
]

// The secret value. Defaults to "the cake is a lie".
const secret = SECRET

app.use(checkJwt({ secret, algorithms: ['HS512'] }).unless({ path: openPaths }))

app.use((err: any, req: any, res: any, next: any) => {
    if (err.name === 'UnauthorizedError') {
        // If the user didn't authorize correctly
        res.status(401).json({ error: err.message }) // Return 401 with error message.
    } else {
        next() // If no errors, forward request to next middleware or route handler
    }
})

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

// create new db connection
new MongoClient('mongodb://localhost', options).connect().then(client => {
    // db name
    const db = client.db('awp-db')
    createInitialQuestion(db)
    createInitialUsers(db)
    // allow cors

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    // routes
    postQuestion(app, db)
    getQuestions(app, db)
    getQuestion(app, db)
    postAnswer(app, db)
    rateAnswerUp(app, db)
    rateAnswerDown(app, db)
    login(app, db)

    // start the Express server
    app.listen(port, () => {
        // tslint:disable-next-line:no-console
        console.log(`server started at http://localhost:${port} `)
    })
})
