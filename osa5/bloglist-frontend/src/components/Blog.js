import React, { useState } from 'react'

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
        {blog.title} {blog.author}
        <button onClick={() => toggleStyle()}>view</button>
      </div>  
    )
  }
}

export default Blog