import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('BlogForm calls callbackFunction with blog object when form is submitted', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Bruh' }
  })

  fireEvent.change(author, {
    target: { value: 'Teemu Teekkari' }
  })

  fireEvent.change(url, {
    target: { value: 'aaltorejects.fi' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'Bruh',
    author: 'Teemu Teekkari',
    url: 'aaltorejects.fi'
  })
})