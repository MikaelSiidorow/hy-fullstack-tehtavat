const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.blogs)
})

test('the correct amount of blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.blogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})

test('returned blog identifier is named id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('a valid blog can be added', async () => {
  const newBlog = {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  
  const titles = blogsAtEnd.map(r => r.title)
  const authors = blogsAtEnd.map(r => r.author)
  const urls = blogsAtEnd.map(r => r.url)

  expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1)
  expect(titles).toContain(
    "Type wars"
  )
  expect(authors).toContain(
    "Robert C. Martin"
  )
  expect(urls).toContain(
    "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
  )
})

test('a blog with no like value is set to 0 likes', async () => {
  const newBlog = {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    __v: 0
  }

  const postedBlog = await api.post('/api/blogs').send(newBlog)
  
  expect(postedBlog.body.likes).toEqual(0)
})

describe('invalid blogs are not added', () => {

  test('a blog with no title is not added', async () => {
    const newBlog = {
      _id: "5a422bc61b54a676234d17fc",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  })

  test('a blog with no url is not added', async () => {
    const newBlog = {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      likes: 2,
      __v: 0
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  })
})