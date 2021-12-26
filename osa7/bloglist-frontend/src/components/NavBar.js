import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'

const NavBar = ({ user }) => {
  const dispatch = useDispatch()

  const padding = {
    paddingRight: 5
  }
  const backgroundColor = {
    backgroundColor: 'lightgray'
  }
  return (
    <div style={backgroundColor}>
      <Link to='/' style={padding}>blogs</Link>
      <Link to='/users' style={padding}>users</Link>
      {user.name} logged in <button onClick={() => dispatch(logout())}>logout</button>
    </div>
  )
}

export default NavBar