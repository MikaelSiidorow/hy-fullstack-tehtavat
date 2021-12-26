const blogsRouter = require('express').Router()
const userExtractor = require('../utils/middleware').userExtractor
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
    
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const blog = new Blog(request.body)
  const user = request.user

  if (!blog.url || !blog.title) {
    return response.status(400).send({ error: 'title or url missing'})
  }
  
  if (!blog.likes) {
    blog.likes = 0
  }

  blog.user = user
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
    
  response.status(201).json(savedBlog)

})

blogsRouter.post('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!request.body.comment) {
    return response.status(400).send({ error: 'missing comment' })
  }

  blog.comments = blog.comments.concat(request.body.comment)
  const updatedBlog = await blog.save()
  response.status(201).json(updatedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog.toJSON())
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() === user.id.toString()) {
    await blog.remove()
    user.blogs = user.blogs.filter(b => b.id.toString() !== request.params.id.toString())
    await user.save()
    response.status(204).end()
  }
  else {
    return response.status(401).json({ error: 'only the creator can delete blogs' })
  }
  
})



module.exports = blogsRouter