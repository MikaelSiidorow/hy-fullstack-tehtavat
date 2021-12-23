import React, { useState, useImperativeHandle } from 'react'

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
            value={blogTitle}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={blogAuthor}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            type="text"
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

export default BlogForm