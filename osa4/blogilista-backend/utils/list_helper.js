const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.map( blog => blog.likes ).reduce( (s, i) => s + i, 0)
}

const favouriteBlog = (blogs) => {
  return blogs.length === 0
  ? null
  : blogs.reduce( (p, c) => (p.likes > c.likes) ? p : c)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  else {
    const arr = _
    .chain(blogs.map( blog => blog.author ))
    .countBy()
    .toPairs()
    .max(_.last)

    return {
      author: _.chain(arr).head().value(),
      blogs: _.chain(arr).last().value()
    }
  } 
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  else {
    const arr = _
    .chain(blogs)
    .groupBy('author')
    .map( (o, k) => ({
      'author': k,
      'likes': _.sumBy(o, 'likes')
    }))
    .maxBy('likes')
    .value()  

    return arr
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}