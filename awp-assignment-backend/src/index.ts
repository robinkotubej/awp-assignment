import express from 'express'
import bodyParser from 'body-parser'
import { MongoClient } from 'mongodb'
import cors from 'cors'
import checkJwt from 'express-jwt'
import { SECRET } from './constants'
import createInitialUsers from './utils/createInitialUsers'
import login from './routes/oauth/login'
import renewToken from './routes/oauth/renewToken'
import createWish from './routes/wish/createWish'
import getWishs from './routes/wish/getWishes'
import getWish from './routes/wish/getWish'
import getUserComplete from './routes/user/getUserComplete'
import getUser from './routes/user/getUser'
import createComment from './routes/commnet/createComment'

const app = express()
const port = 8080
app.use(cors())

const openPaths = [/^\/api\/.*/, { url: '/oauth/authorize', methods: ['POST'] }]

const secret = SECRET

app.use(checkJwt({ secret, algorithms: ['HS512'] }).unless({ path: openPaths }))

app.use((err: any, req: any, res: any, next: any) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: err.message })
    } else {
        next()
    }
})

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

new MongoClient('mongodb://localhost', options).connect().then(client => {
    const db = client.db('wishlister-db')
    createInitialUsers(db)

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    login(app, db)
    renewToken(app, db)
    createWish(app, db)
    getWishs(app, db)
    getWish(app, db)
    getUserComplete(app, db)
    createComment(app, db)
    getUser(app, db)

    app.listen(port, () => {
        // tslint:disable-next-line:no-console
        console.log(`server started at http://localhost:${port} `)
    })
})
