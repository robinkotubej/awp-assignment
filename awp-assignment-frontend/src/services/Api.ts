import Question from '../types/Question'

class Api {
  static async postQuestion(username: string, question: string) {
    const response = await fetch(`http://localhost:8080/post-question`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, question }),
    })
    const data = await response.json()
    return data
  }

  static async getQuestion(questionId: string) {
    const response = await fetch(
      `http://localhost:8080/get-question/${questionId}`
    )
    const data = await response.json()
    return data as Question
  }

  static async getQuestions() {
    const response = await fetch(`http://localhost:8080/get-questions`)
    const data = await response.json()
    return data as Question[]
  }

  static async postAnswer(
    username: string,
    answer: string,
    questionId: string
  ) {
    const response = await fetch(
      `http://localhost:8080/post-answer/${questionId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, answer }),
      }
    )
    const data = await response.json()
    return data as Question
  }

  static async rateAnswerUp(questionId: string, answerId: string) {
    const response = await fetch(
      `http://localhost:8080/rate-answer-up/${questionId}/${answerId}`,
      {
        method: 'POST',
      }
    )
    const data = await response.json()
    return data as Question
  }

  static async rateAnswerDown(questionId: string, answerId: string) {
    const response = await fetch(
      `http://localhost:8080/rate-answer-down/${questionId}/${answerId}`,
      {
        method: 'POST',
      }
    )
    const data = await response.json()
    return data as Question
  }
}

export default Api
