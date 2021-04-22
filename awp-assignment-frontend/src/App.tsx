import AskQuestion from './pages/AskQuestion'
import Header from './components/Header'
import { Router } from '@reach/router'
import Home from './pages/Home'
import styled from 'styled-components'
import QuestionDetail from './pages/QuestionDetail'

function App() {
  return (
    <Container>
      <Header />
      <Content>
        <Router>
          <Home path="/" />
          <AskQuestion path="/ask-question" />
          <QuestionDetail path="question/:questionId" />
        </Router>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`
const Content = styled.div`
  width: 960px;
  display: flex;
  flex-direction: column;
`

export default App
