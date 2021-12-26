import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useParams, useHistory } from 'react-router-dom'
import blogService from '../services/blogs'

const Blog = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const id = useParams().id
  const blog = blogs.find(n => n.id === id)

  const [comment, setComment] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()

  if (!blog) {
    return null
  }

  const own = user && blog.user.username === user.username

  const handleRemove = () => {
    dispatch(removeBlog(blog))
    history.push('/')
  }

  const postComment = async (event) => {
    event.preventDefault()
    await blogService.createComment(id, { comment })
    blog.comments = blog.comments.concat(comment)
    setComment('')
  }

  return (
    <div>
      <h1>{blog.title} {blog.author}</h1>
      <div><a href={blog.url.match(/^.{3,5}:\/\//) ? blog.url : `http://${blog.url}`}>{blog.url}</a></div>
      <div>{blog.likes} likes
        <button onClick={() => dispatch(likeBlog(blog))}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {own && <button onClick={handleRemove}>remove</button>}
      <h3>comments</h3>
      <form onSubmit={postComment}>
        <input
          id='comment'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button id='comment'>add comment</button>
      </form>
      <ul>
        {blog.comments.map(comment =>
          <li key={comment}>{comment}</li>
        )}
      </ul>
    </div>
  )
}

export default Blog