import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import NewBlog from './NewBlog'
import Togglable from './Togglable'
import { Table } from 'react-bootstrap'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const blogFormRef = React.createRef()

  const byLikes = (b1, b2) => b2.likes - b1.likes

  if (!user) {
    return null
  }
  return (
    <div>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlog />
      </Togglable>
      <hr />
      <Table striped hover>
        <tbody>
          {blogs.sort(byLikes).map(blog =>
            <tr key={blog.id} className='blog'>
              <td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
              <td>by {blog.author}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList