import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'
import { Nav, Navbar, Button } from 'react-bootstrap'

const NavBar = ({ user }) => {
  const dispatch = useDispatch()

  const padding = {
    paddingRight: 5
  }

  return (
    <Navbar collapseOnSelect expand='lg' bg='light' variant='light'>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='#' as='span'>
            <Link className='link-dark' to='/' style={padding}>blogs</Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link to='/users' style={padding}>users</Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            {user.name} logged in <Button variant='danger' onClick={() => dispatch(logout())}>logout</Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar