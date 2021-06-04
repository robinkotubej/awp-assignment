import { RouteComponentProps } from '@reach/router'
import AskForm from '../components/AskForm'

const AskQuestion = (props: RouteComponentProps) => (
  <div>
    <h2>Post question</h2>
    <AskForm />
  </div>
)

export default AskQuestion
