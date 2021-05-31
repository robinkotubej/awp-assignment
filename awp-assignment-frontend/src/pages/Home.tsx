import { RouteComponentProps } from '@reach/router'
import { useEffect, useState } from 'react'
import Heading from '../components/Heading'
import QuestionPreview from '../components/QuestionPreview'
import Api from '../services/Api'
import Question from '../types/Question'

const Home = (props: RouteComponentProps) => {
  const [questions, setQuestions] = useState<Question[] | null>()
  const [loading, setLoading] = useState(true)

  const fetchQuestions = async () => {
    try {
      const questions = await Api.getQuestions()
      setQuestions(questions)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [loading])

  return (
    <div>
      <Heading>My cool app</Heading>
      <p>
        this app is inspired by stackoverflow wheer you can post your questions
        and people can answer and rate the answers as well
      </p>
      {!loading ? (
        questions?.map(question => (
          <QuestionPreview key={question.questionId} question={question} />
        ))
      ) : (
        <p>loading...</p>
      )}
    </div>
  )
}

export default Home
