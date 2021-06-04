import jwtDecode, { JwtPayload } from 'jwt-decode'

interface myJWT extends JwtPayload {
  username: string
  userId: string
}

const decodeJWT = (token: string) => {
  const decoded = jwtDecode<myJWT>(token) // Returns with the JwtPayload type

  return decoded
}

export default decodeJWT
