import NavLink from './NavLink'
import styled from 'styled-components'
import { COLOR } from '../constants'
import MessageSVG from '../icons/MessageSVG'

import ProfileLink from './ProfileLink'
import { useAuth } from '../services/Auth'

const Header = () => {
  const { loggedIn, logout } = useAuth()

  return (
    <Container>
      <Logo>
        <MessageSVG />
        <NavLink to="/">
          <LogoText>Wishlister app</LogoText>
        </NavLink>
      </Logo>
      <Navigation>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/create-wish">Create Wish</NavLink>
        {loggedIn ? (
          <>
            <ProfileLink />
            <NavLink to="/" onClick={() => logout()}>
              Logout
            </NavLink>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </Navigation>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${COLOR.GREEN};
  width: 100%;
  padding: 0px 32px;
`
const Logo = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 26px;
  margin: 12px 0px;
`
const LogoText = styled.span`
  margin-left: 5px;
`
const Navigation = styled.nav`
  display: flex;
`

export default Header
