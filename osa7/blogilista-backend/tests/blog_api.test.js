const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  for (let user of helper.users) {
    let passwordHash = await bcrypt.hash(user.password, 10)
    let newUser = new User({ username: user.username, name: user.name, passwordHash })
    await newUser.save()
  }

  const user = await User.findOne({ username: helper.users[0].username })

  await Blog.deleteMany({})
  await Blog.insertMany(helper.blogs.map( blog => ({
    user: user.id,
    ...blog
  })))

  const blogs = await helper.blogsInDb()
  user.blogs = user.blogs.concat(blogs.map(blog => blog.id))

  await User.findOneAndUpdate({ username: helper.users[0].username }, user)
})

test('the correct amount of blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.blogs.length)
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

  const response = await api.post('/api/login').send({ username: helper.users[1].username, password: helper.users[1].password })
  const token = response.body.token
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${token}`)
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

  const response = await api.post('/api/login').send({ username: helper.users[1].username, password: helper.users[1].password })
  const token = response.body.token

  const postedBlog = await api.post('/api/blogs').send(newBlog).set('Authorization', `bearer ${token}`)
  
  expect(postedBlog.body.likes).toEqual(0)
})

describe('invalid blogs are not added', () => {

  test('creation of new blog does not work without a valid token', async () => {
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
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.blogs.length)
  })

  test('a blog with no title is not added', async () => {
    const newBlog = {
      _id: "5a422bc61b54a676234d17fc",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }

    const response = await api.post('/api/login').send({ username: helper.users[1].username, password: helper.users[1].password })
    const token = response.body.token

    await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${token}`)
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

    const response = await api.post('/api/login').send({ username: helper.users[1].username, password: helper.users[1].password })
    const token = response.body.token

    await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(400)
  })
})

describe('deletion of a blog', () => {

  test('blog with valid id is deleted with status code 204', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogtoDelete = blogsAtStart[0]

    const response = await api.post('/api/login').send({ username: helper.users[0].username, password: helper.users[0].password })
    const token = response.body.token

    await api
      .delete(`/api/blogs/${blogtoDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.blogs.length - 1)

    const urls = blogsAtEnd.map(r => r.url)

    expect(urls).not.toContain(blogtoDelete.url)
  })

})

describe('update of a blog', () => {

  test('likes of blog with valid id are updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${updatedBlog.id}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.blogs.length)
    expect(blogsAtEnd[0].likes).toEqual(updatedBlog.likes)
  })

})

describe('when a blog is posted to api', () => {
  let headers

  beforeEach(async () => {
    const newUser = {
      username: 'janedoez',
      name: 'Jane Z. Doe',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      'Authorization': `bearer ${result.body.token}`
    }
  })

  test('it is saved to database', async () => {
    const newBlog = {
      title: 'Great developer experience',
      author: 'Hector Ramos',
      url: 'https://jestjs.io/blog/2017/01/30/a-great-developer-experience',
      likes: 7
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.blogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(
      'Great developer experience'
    )
  })

  test('likes get value 0 as default', async () => {
    const newBlog = {
      title: 'Blazing Fast Delightful Testing',
      author: 'Rick Hanlon',
      url: 'https://jestjs.io/blog/2017/01/30/a-great-developer-experience'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const added = blogsAtEnd.find(b => b.url === newBlog.url)

    expect(added.likes).toBe(0)
  })

  test('operation fails with proper error if url is missing', async () => {
    const newBlog = {
      title: 'Blazing Fast Delightful Testing',
      author: 'Rick Hanlon',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('operation fails with proper error if token is missing', async () => {
    const newBlog = {
      title: 'Blazing Fast Delightful Testing',
      author: 'Rick Hanlon',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  describe('and it is saved to database', () => {
    let result
    beforeEach(async () => {
      const newBlog = {
        title: 'Great developer experience',
        author: 'Hector Ramos',
        url: 'https://jestjs.io/blog/2017/01/30/a-great-developer-experience',
        likes: 7
      }

      result = await api
        .post('/api/blogs')
        .send(newBlog)
        .set(headers)
    })

    test('it can be removed', async () => {
      const aBlog = result.body

      const initialBlogs = await helper.blogsInDb()
      await api
        .delete(`/api/blogs/${aBlog.id}`)
        .set(headers)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(initialBlogs.length - 1)

      const titles = blogsAtEnd.map(b => b.title)
      expect(titles).not.toContain(
        aBlog.title
      )
    })
  })
})

describe('creation of a user', () => {
  test('succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const newUser = {
      username: 'johndoe',
      name: 'John Doe',
      password: 'sekred',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const newUser = {
      username: 'janedoe',
      name: 'Jane Doe',
      password: 'p',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must be at least 3 characters long')
  })
})

afterAll(() => {
  mongoose.connection.close()
})