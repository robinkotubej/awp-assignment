import Question from '../types/Question'

const getApiUrl = () => {
  if (window.location.origin === 'http://164.90.164.4') {
    return 'http://164.90.164.4:8080'
  } else return 'http://localhost:8080'
}

class Api {
  static async postQuestion(username: string, question: string) {
    const response = await fetch(`${getApiUrl()}/post-question`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, question }),
    })
    const data = await response.json()
    return data
  }

  static async getQuestion(questionId: string) {
    const response = await fetch(`${getApiUrl()}/get-question/${questionId}`)
    const data = await response.json()
    return data as Question
  }

  static async getQuestions() {
    const response = await fetch(`${getApiUrl()}/get-questions`)
    const data = await response.json()
    return data as Question[]
  }

  static async postAnswer(
    username: string,
    answer: string,
    questionId: string
  ) {
    const response = await fetch(`${getApiUrl()}/post-answer/${questionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, answer }),
    })
    const data = await response.json()
    return data as Question
  }

  static async rateAnswerUp(questionId: string, answerId: string) {
    const response = await fetch(
      `${getApiUrl()}/rate-answer-up/${questionId}/${answerId}`,
      {
        method: 'POST',
      }
    )
    const data = await response.json()
    return data as Question
  }

  static async rateAnswerDown(questionId: string, answerId: string) {
    const response = await fetch(
      `${getApiUrl()}/rate-answer-down/${questionId}/${answerId}`,
      {
        method: 'POST',
      }
    )
    const data = await response.json()
    return data as Question
  }
}

export default Api
