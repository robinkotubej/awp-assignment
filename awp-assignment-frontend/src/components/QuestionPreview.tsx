import styled from 'styled-components'
import Question from '../types/Question'
import UserBubble from './UserBubble'
import moment from 'moment'
import AnswerPreview from './AnswerPreview'
import Answer from '../types/Answer'
import { Link } from '@reach/router'

interface Props {
  question: Question
  detail?: boolean
}

const QuestionPrewiew = ({ question, detail }: Props) => (
  <Container>
    {detail ? (
      <QusetionContainer>
        <UserBubble userName={question.username} align="right" />
        <Wrapper>
          <Date>{moment(question.timeCreated).format('YYYY/M/D HH:MM')}</Date>
          <QuestionText>{question.question}</QuestionText>
        </Wrapper>
      </QusetionContainer>
    ) : (
      <Link to={`question/${question.questionId}`}>
        <QusetionContainer>
          <UserBubble userName={question.username} align="right" />
          <Wrapper>
            <Date>{moment(question.timeCreated).format('YYYY/M/D HH:MM')}</Date>
            <QuestionText>{question.question}</QuestionText>
          </Wrapper>
        </QusetionContainer>
      </Link>
    )}

    {question.answers.map((answer: Answer) => (
      <AnswerPreview
        questionId={question.questionId}
        key={answer.answerId}
        answer={answer}
      />
    ))}
    <Line />
  </Container>
)
const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
`
const QusetionContainer = styled.div`
  display: flex;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 450px;
`
const Date = styled.div`
  font-size: 16px;
  font-style: italic;
  color: #bbb;
  align-self: flex-end;
  margin-bottom: 4px;
`
const QuestionText = styled.div`
  padding: 14px;
  background-color: #fff;
  border-radius: 0px 10px 10px 10px;
  border: solid 1px #dfdfdf;
`
const Line = styled.hr`
  border-top: 1px solid #ddd;
  width: 100%;
  margin: 0px 0px 40px 0px;
`

export default QuestionPrewiew
