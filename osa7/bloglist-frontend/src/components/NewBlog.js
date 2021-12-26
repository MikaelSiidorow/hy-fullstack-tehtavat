import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewBlog = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleNewBlog = (event) => {
    event.preventDefault()
    dispatch(createBlog({ title, author, url }))
    dispatch(setNotification(`a new blog '${title}' by ${author} added!`, false, 5))
    /*
    props.createBlog({
      title, author, url
    })
    */
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={handleNewBlog}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control
            id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            type='text'
            name='title'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>author</Form.Label>
          <Form.Control
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            type='text'
            name='author'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>url</Form.Label>
          <Form.Control
            id='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            type='text'
            name='URL'
          />
        </Form.Group>
        <Button variant='primary' type='submit' id='create'>create</Button>
      </Form>
    </div>
  )
}

export default NewBlog