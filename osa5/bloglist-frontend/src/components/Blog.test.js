import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const likeBlog = jest.fn()
  const removeBlog = jest.fn()

  beforeEach(() => {
    const blog = {
      id: '61c27ace7c2d650e1f0f9273',
      title: 'Teekkarius',
      author: 'Mulkero',
      url: 'lutrejects.fi',
      likes: '150',
      user: {
        id: '61b8ae86528d7ef1b15a5665',
        name: 'Teemu Teekkari',
        username: 'mulkero'
      }
    }

    const user = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiaWQiOiI2MWI4YWU4NjUyOGQ3ZWYxYjE1YTU2NjUiLCJpYXQiOjE2NDAyNDEyMjB9.qf3VeefgW1QDF4dbFbe4j_mMfqOuPJabjgCUxSwFvxI',
      username: 'mulkero',
      name: 'Teemu Teekkari',
    }

    component = render(
      <Blog
        blog={blog}
        likeBlog={likeBlog}
        removeBlog={removeBlog}
        user={user}
      />
    )
  })

  test('renders only title and author by default', () => {

    expect(component.container).toHaveTextContent(
      'Teekkarius'
    )
    expect(component.container).toHaveTextContent(
      'Mulkero'
    )
    expect(component.container).not.toHaveTextContent(
      'lutrejects.fi'
    )
    expect(component.container).not.toHaveTextContent(
      '150'
    )
  })

  test('also renders url and likes after view button is pressed', () => {

    const viewButton = component.getByText('view')

    fireEvent.click(viewButton)

    expect(component.container).toHaveTextContent(
      'lutrejects.fi'
    )
    expect(component.container).toHaveTextContent(
      '150'
    )

  })

  test('when like button is pressed twice, eventHandler is called twice', () => {

    const viewButton = component.getByText('view')

    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likeBlog.mock.calls).toHaveLength(2)


  })
})