import { Db } from 'mongodb'
import Question from '../types/Question'
import { v4 as uuid } from 'uuid'
const initQuestion: Question = {
    _id: uuid(),
    timeCreated: new Date(),
    username: 'Robin Kotubej',
    question:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    updatedAt: null,
    answers: [
        {
            answerId: uuid(),
            timeCreated: new Date(),
            username: 'Elon Musk',
            downVoteCount: 0,
            updatedAt: null,
            upVoteCount: 10,
            answer:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
    ],
}

const createInitialQuestion = async (db: Db) => {
    const questionsCol = db.collection<Question>('questions')
    const question = await questionsCol.find({}).toArray()
    if (question.length === 0) {
        questionsCol.insertOne(initQuestion)
    }
}

export default createInitialQuestion
