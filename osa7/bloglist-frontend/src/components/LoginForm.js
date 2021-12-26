import React, { useState } from 'react'
import Notification from './Notification'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../reducers/userReducer'
import NavBar from './NavBar'

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

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }
  else {
    return (
      <div>
        <NavBar user={user}/>
        <h2>blog app</h2>

        <Notification />
      </div>
    )
  }
}

export default LoginForm