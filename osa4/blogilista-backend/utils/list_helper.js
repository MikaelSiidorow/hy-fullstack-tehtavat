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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}