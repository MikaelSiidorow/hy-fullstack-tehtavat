import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useParams, useHistory } from 'react-router-dom'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'
import { ListGroup, Button, Form } from 'react-bootstrap'

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
    <div className='container'>
      <div className='container'>
        <h1><i>{blog.title}</i> by {blog.author}</h1>
        <div><a href={blog.url.match(/^.{3,5}:\/\//) ? blog.url : `http://${blog.url}`}>{blog.url}</a></div>
        <div>{blog.likes} likes
          <Button variant='success' onClick={() => dispatch(likeBlog(blog))}>like</Button>
        </div>
        <div>added by <Link to={`/users/${blog.user.id}/`}>{blog.user.name}</Link></div>
        {own && <Button variant='danger' onClick={handleRemove}>remove</Button>}
        <hr />
      </div>
      <div className='container'>
        <h3>comments</h3>
        <Form onSubmit={postComment}>
          <Form.Control
            id='comment'
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            type='text'
            name='comment'
          />
          <Button variant='primary' type='submit' id='comment'>add comment</Button>
        </Form>
        <hr />
        <ListGroup>
          {blog.comments.map(comment =>
            <ListGroup.Item key={comment}>{comment}</ListGroup.Item>
          )}
        </ListGroup>
      </div>
    </div>
  )
}

export default Blog