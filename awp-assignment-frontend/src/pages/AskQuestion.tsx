import { RouteComponentProps } from '@reach/router'
import Form from '../components/Form'

const AskQuestion = (props: RouteComponentProps) => (
  <div>
    <h2>Post question</h2>
    <Form type="question" />
  </div>
)

export default AskQuestion
