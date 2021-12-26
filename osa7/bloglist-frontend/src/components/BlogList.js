import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import NewBlog from './NewBlog'
import Togglable from './Togglable'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const blogFormRef = React.createRef()

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (!user) {
    return null
  }
  return (
    <div>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlog />
      </Togglable>

      {blogs.sort(byLikes).map(blog =>
        <div key={blog.id} style={blogStyle} className='blog'>
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
      )}
    </div>
  )
}

export default BlogList