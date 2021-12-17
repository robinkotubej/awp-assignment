import styled from 'styled-components'
import { COLOR, Z_INDEX } from '../constants'
import ErrorSVG from '../icons/ErrorSVG'

interface Props {
  onClose: () => void
  message: string
  btnMessage: string
}
const AlertModal = ({ onClose, message, btnMessage }: Props) => {
  return (
    <Container>
      <Backdrop onClick={onClose} />
      <AlertWindow>
        <Heading>Error</Heading>
        <ErrorSVG />
        <Message>{message}</Message>
        <Row>
          <Button onClick={onClose}>{btnMessage}</Button>
        </Row>
      </AlertWindow>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`
const Backdrop = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: #00000033;
  z-index: ${Z_INDEX.BACKDROP};
`
const AlertWindow = styled.div`
  width: 590px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  box-shadow: 2px 0px 18px #00000020;
  margin: 180px auto 0 auto;
  padding-bottom: 60px;
  position: relative;
  z-index: ${Z_INDEX.MODAL_WINDOW};
`
const Heading = styled.h3`
  color: #222;
  font-size: 20px;
  text-transform: uppercase;
  margin-bottom: 26px;
`
const Message = styled.p`
  font-size: 14px;
  color: #222;
  text-align: center;
  margin-top: 26px;
`
const Row = styled.div`
  display: flex;
  align-items: center;
  margin-top: 60px;
`
const Button = styled.button`
  width: 120px;
  display: flex;
  justify-content: center;
  padding: 8px 0;
  border-radius: 8px;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 700;
  color: #fff;
  background: ${COLOR.RED};

  :first-child {
    margin-right: 10px;
  }

  :hover {
    background: ${COLOR.HOVER.RED};
  }

  :active {
    background: ${COLOR.ACTIVE.RED};
  }
`

export default AlertModal
