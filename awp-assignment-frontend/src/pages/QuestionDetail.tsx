import { RouteComponentProps } from '@reach/router'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Form from '../components/Form'
import QuestionPrewiew from '../components/QuestionPreview'
import Api from '../services/Api'
import Question from '../types/Question'

interface QuestionProps extends RouteComponentProps {
  questionId?: string
}

const QuestionDetail = ({ questionId }: QuestionProps) => {
  const [question, setQuestion] = useState<Question | undefined>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        if (questionId) {
          const question = await Api.getQuestion(questionId)
          setQuestion(question)
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchQuestion()
  }, [questionId, question?.questionId])
  return (
    <Container>
      {!loading && question ? (
        <>
          <QuestionPrewiew question={question} detail />
          <Form
            type="answer"
            questionId={questionId}
            setQuestion={(question: Question) => setQuestion(question)}
          />
        </>
      ) : (
        <p>loading</p>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 0px;
`
export default QuestionDetail
