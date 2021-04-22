import Question from '../types/Question'

const mapQuestion = (question: Question) => ({
    questionId: question._id,
    timeCreated: question.timeCreated,
    username: question.username,
    question: question.question,
    answers: question.answers,
    updatedAt: question.updatedAt,
})

export default mapQuestion
