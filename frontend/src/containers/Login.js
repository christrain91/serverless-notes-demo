import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import LoaderButton from '../components/LoaderButton'
import styled from 'styled-components'
import { Auth } from 'aws-amplify'
import { useAppContext } from '../lib/contextLib'
import { useHistory } from 'react-router-dom'
import { useFormFields } from '../lib/hooksLib'

const LoginContainer = styled.div`
  @media all and (min-width: 480px) {
    padding: 60px 0;

    form {
      margin: 0 auto;
      max-width: 320px;
    }
  }
`


export default function Login () {
  const [isLoading, setIsLoading] = useState(false)
  const { userHasAuthenticated } = useAppContext()
  const history = useHistory()
  const [fields, handleFieldChange] = useFormFields({
    emai: '',
    password: ''
  })

  const validateForm = () => {
    return fields.email.length > 0 && fields.password.length > 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setIsLoading(true)

    try {
      await Auth.signIn(fields.email, fields.password)
      alert('Logged in')
      userHasAuthenticated(true)
      history.push('/')
    }
    catch (e) {
      alert(e.message)
      userHasAuthenticated(false)
      setIsLoading(false)
    }

  }

  return <LoginContainer>
    <Form onSubmit={handleSubmit}>
      <Form.Group size="lg" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          autoFocus
          type="email"
          value={fields.email}
          id="email"
          onChange={handleFieldChange}
        />
      </Form.Group>
      <Form.Group size="lg" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={fields.password}
          id="password"
          onChange={handleFieldChange}
        />
      </Form.Group>
      <LoaderButton isLoading={isLoading} block size="lg" type="submit" disabled={!validateForm()}>
        Login
      </LoaderButton>
    </Form>
  </LoginContainer>
}