import Answer from './Answer'

interface Question {
  questionId: string
  timeCreated: Date
  username: string
  question: string
  answers: Answer[] | []
  updatedAt: Date | null
}
export default Question
