import CreateWish from './pages/CreateWish'
import Header from './components/Header'
import { Router } from '@reach/router'
import Home from './pages/Home'
import styled from 'styled-components'
import Login from './pages/Login'
import { AuthProvider } from './services/Auth'
import WishDetail from './pages/WishDetail'
import UserProfile from './pages/UserProfile'

function App() {
  return (
    <AuthProvider>
      <Container>
        <Header />
        <Content>
          <Router>
            <Home path="/" />
            <CreateWish path="/create-wish" />
            <WishDetail path="wish/:ownerId/:wishId" />
            <UserProfile path="user/:userId" />
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
