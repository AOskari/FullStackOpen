const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body
  console.log(body)
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  if (body.password.length > 3 && body.username.length > 3) {
    const savedUser = await user.save()
    response.json(savedUser)
  } else {
    response.status(400).end()
    console.log('Password and username have to be at least 3 characters long!')
  }
})

usersRouter.get('/', async (request, response) => {
   const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1, id: 1})
   response.json(users.map(user => user.toJSON()))
})

module.exports = usersRouter