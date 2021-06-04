import AskQuestion from './pages/AskQuestion'
import Header from './components/Header'
import { Router } from '@reach/router'
import Home from './pages/Home'
import styled from 'styled-components'
import QuestionDetail from './pages/QuestionDetail'
import Login from './pages/Login'
import { AuthProvider } from './services/Auth'

function App() {
  return (
    <AuthProvider>
      <Container>
        <Header />
        <Content>
          <Router>
            <Home path="/" />
            <AskQuestion path="/ask-question" />
            <QuestionDetail path="question/:questionId" />
            <Login path="/login" />
          </Router>
        </Content>
      </Container>
    </AuthProvider>
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
