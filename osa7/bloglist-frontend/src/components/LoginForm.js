import React, { useState } from 'react'
import Notification from './Notification'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../reducers/userReducer'
import NavBar from './NavBar'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const user = useSelector(state => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = e => {
    e.preventDefault()
    dispatch(login(username, password))
  }

  if (!user) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />

        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>username</Form.Label>
            <Form.Control
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              type='text'
              name='username'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>password</Form.Label>
            <Form.Control
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              type='password'
              name='password'
            />
          </Form.Group>
          <Button variant='primary' type='submit' id='login'>login</Button>
        </Form>
      </div>
    )
  }
  else {
    return (
      <div>
        <NavBar user={user}/>
        <h2>Blog App</h2>

        <Notification />
      </div>
    )
  }
}

export default LoginForm