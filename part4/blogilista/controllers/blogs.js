const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', {username: 1, name: 1})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = getTokenFrom(request)

  if (!token) {
    return response.status(401).json({ error: 'token is missing' })
  }
  
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token is invalid' })
  }
  const user = await User.findById(decodedToken.id)
  let likes = 0;

  if (body.hasOwnProperty('likes') && body.likes > 0){
    likes = body.likes;
  } else {
    likes = 0;
  }
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: likes,
    user: user.id
  })

    if (!body.hasOwnProperty('url') || !body.hasOwnProperty('title')) {
      response.status(400).end()
    } else {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog)
        await user.save()
        response.json(savedBlog.toJSON())
    }    
})

blogsRouter.delete('/:id', async (request, response, next) => {

  const token = getTokenFrom(request)
  console.log("1")

  const decodedToken = jwt.verify(token, process.env.SECRET)
  console.log("2")

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token is missing or invalid' })
  }
  console.log(decodedToken.id.toString())
  console.log("3")
  console.log("4")
  console.log(request.params.id)
  console.log("5")

  const blog = await Blog.findById(request.params.id)

  if ( decodedToken.id.toString() === blog.user.toString() ) {
    const blogs = await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  } else {
    return response.status(401).end()
  }
})


blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const update = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(204).end()
})

module.exports = blogsRouter