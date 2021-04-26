import styled from 'styled-components'
import Answer from '../types/Answer'
import UserBouble from './UserBubble'
import moment from 'moment'
import ChevronUp from '../icons/ChevronUp'
import ChevronDown from '../icons/ChevronDown'
import { COLOR } from '../constants'
import { useEffect, useState } from 'react'
import Api from '../services/Api'

interface Props {
  answer: Answer
  questionId: string
}

const AnswerPreview = ({ answer, questionId }: Props) => {
  const [vote, setVote] = useState<'up' | 'down' | null>(null)
  const [answert, setAnswert] = useState(answer)

  useEffect(() => {
    const handleFetch = async (vote: string | null) => {
      if (vote === 'up') {
        const q = await Api.rateAnswerUp(questionId, answer.answerId)
        const currentAns = q.answers.find(a => {
          return a.answerId === answer.answerId
        })
        setAnswert(currentAns!)
      } else if (vote === 'down') {
        const q = await Api.rateAnswerDown(questionId, answer.answerId)
        const currentAns = q.answers.find(a => {
          return a.answerId === answer.answerId
        })
        setAnswert(currentAns!)
      }
    }
    handleFetch(vote)
  }, [vote, questionId, answer.answerId])

  return (
    <Container>
      <VotesWrapper>
        <VoteBtnUp onClick={() => setVote('up')} voted={vote}>
          <ChevronUp />
        </VoteBtnUp>
        <span>{answert.upVoteCount - answert.downVoteCount}</span>
        <VoteBtnDown onClick={() => setVote('down')} voted={vote}>
          <ChevronDown />
        </VoteBtnDown>
      </VotesWrapper>
      <Wrapper>
        <Date>{moment(answert.timeCreated).format('YYYY/M/D HH:MM')}</Date>
        <AnswerText>{answert.answer}</AnswerText>
      </Wrapper>
      <UserBouble userName={answert.username} align="left" />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  max-width: 500px;
  margin: 16px 0px;
`
const VotesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`
const VoteBtnUp = styled.div<{ voted: string | null }>`
  color: ${props => (props.voted === 'up' ? COLOR.GREEN : `${COLOR.GREEN}55`)};
  cursor: pointer;

  :hover {
    color: ${COLOR.HOVER.GREEN};
  }
  :active {
    color: ${COLOR.ACTIVE.GREEN};
  }
  svg {
    width: 36px;
    height: 36px;
  }
`
const VoteBtnDown = styled.div<{ voted: string | null }>`
  color: ${props =>
    props.voted === 'down' ? COLOR.GREEN : `${COLOR.GREEN}55`};
  cursor: pointer;

  :hover {
    color: ${COLOR.HOVER.GREEN};
  }
  :active {
    color: ${COLOR.ACTIVE.GREEN};
  }
  svg {
    width: 36px;
    height: 36px;
  }
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
  align-self: flex-start;
  margin-bottom: 4px;
`
const AnswerText = styled.div`
  padding: 14px;
  background-color: #fff;
  border-radius: 10px 0px 10px 10px;
  border: solid 1px #dfdfdf;
`

export default AnswerPreview
