import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find(n => n.id === id)

  if (!user) {
    return null
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <hr />
      <h2>added blogs</h2>
      <ListGroup>
        {user.blogs.map(blog =>
          <ListGroup.Item key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></ListGroup.Item>
        )}
      </ListGroup>
    </div>
  )
}

export default User