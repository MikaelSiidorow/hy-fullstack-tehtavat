import React, { useState, useEffect } from 'react'

import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UserList from './components/UserList'
import User from './components/User'
import LoginForm from './components/LoginForm'

import axios from 'axios'

import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { retrieveUserFromStorage } from './reducers/userReducer'

import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'

const App = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('/api/users')
      .then(response => response.data)
      .then(users =>
        setUsers(users))
  }, [])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(retrieveUserFromStorage())
  }, [dispatch])

  return (
    <div className='container'>
      <Router>
        <LoginForm />
        <hr />
        <Switch>
          <Route path='/users/:id'>
            <User users={users} />
          </Route>
          <Route path='/users'>
            <UserList users={users} />
          </Route>
          <Route path='/blogs/:id'>
            <Blog />
          </Route>
          <Route path='/'>
            <BlogList />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App