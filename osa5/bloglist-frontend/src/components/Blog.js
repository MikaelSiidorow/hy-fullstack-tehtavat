import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
  const [extended, setExtended] = useState(false)

  const toggleStyle = () => {
    setExtended(!extended)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (extended) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title}
          <button onClick={() => toggleStyle()}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes}
          <button onClick={likeBlog}>like</button>
        </div>
        <div>
          {blog.author}
        </div>
        {user.username === blog.user.username ? <button onClick={removeBlog}>remove</button> : null}
      </div>
    )
  }
  else {
    return (
      <div style={blogStyle}>
        <span>{blog.title} {blog.author}</span>
        <button onClick={() => toggleStyle()}>view</button>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog