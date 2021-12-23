import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const BlogForm = React.forwardRef(({ createBlog }, ref) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogURL, setBlogURL] = useState('')

  const handleTitleChange = (event) => {
    setBlogTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setBlogAuthor(event.target.value)
  }
  const handleURLChange = (event) => {
    setBlogURL(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogURL
    })
  }

  const resetFields = () => {
    setBlogAuthor('')
    setBlogTitle('')
    setBlogURL('')
  }

  useImperativeHandle(ref, () => {
    return {
      resetFields
    }
  })

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            id='title'
            value={blogTitle}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            id='author'
            value={blogAuthor}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            id='url'
            value={blogURL}
            name="URL"
            onChange={handleURLChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
})

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

BlogForm.displayName = 'BlogForm'

export default BlogForm