import { Link } from '@reach/router'
import styled from 'styled-components'

const NavLink = (props: any) => (
  <Container>
    <Link
      {...props}
      getProps={({ isCurrent }) => {
        // the object returned here is passed to the
        // anchor element's props
        return {
          style: {
            opacity: isCurrent ? '1' : '.5',
            color: 'inherit',
            textDecoration: 'none',
          },
        }
      }}
    />
  </Container>
)

const Container = styled.p`
  text-transform: uppercase;
  margin-left: 24px;
  color: #fff;
  font-weight: 600;
  :hover {
    color: #bebebe;
  }
`
export default NavLink
