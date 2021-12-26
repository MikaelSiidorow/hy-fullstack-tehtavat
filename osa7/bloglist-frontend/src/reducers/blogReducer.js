import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'LIKE':
    return state.map(blog =>
      blog.id !== action.data.id ? blog : action.data)
  case 'REMOVE':
    return state.filter(blog =>
      blog.id !== action.data.id)
  default: return state
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    await blogService.update(blog.id, { ...blog, likes: blog.likes + 1, user: blog.user.id })
    dispatch({
      type: 'LIKE',
      data: { ...blog, likes: blog.likes + 1 }
    })
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      await blogService.remove(blog.id)
      dispatch({
        type: 'REMOVE',
        data: blog
      })
    }
  }
}

export default blogReducer