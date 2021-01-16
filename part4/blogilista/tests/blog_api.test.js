const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const jwt = require('jsonwebtoken')

const token = process.env.TEST_TOKEN

test('Blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const title = response.body.map(r => r.title)
    const id = response.body.map(r => r.id)

    expect(title).toContain("No one knows what it's like")
    expect(id).toBeDefined()
})

test('Blogs can be added', async () => {
  const newBlog = {
    title: 'new title2',
    author: 'test',
    url: 'asd.com',
    likes: 123
  }

  await api
  .post('/api/blogs')
  .set('Authorization', token)
  .send(newBlog)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const title = response.body.map(r => r.title)

  expect(title).toContain('new title2')
})

test('Blogs without a token wont be added', async () => {
  const newBlog = {
    title: 'new title3',
    author: 'test',
    url: 'asd.com',
    likes: 1234
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(401)
  .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const title = response.body.map(r => r.title)

  expect(title).not.toContain('new title3')

})




test('Blogs with no likes have 0 likes', async () => {
  const newBlog = {
    title: 'new title',
    author: 'test',
    url: 'asd.com'
  }

  await api
  .post('/api/blogs')
  .set('Authorization', token)
  .send(newBlog)
  .expect(200)

  const response = await api.get('/api/blogs')
  const likes = response.body.map(r => r.likes)
  expect(likes).toContain(0)
})


test('Blogs require a title and an url', async () => {
  const newBlog = {
    author: 'test'
  }

  await api
  .post('/api/blogs')
  .set('Authorization', token)
  .send(newBlog)
  .expect(400)

  const response = await api.get('/api/blogs')
  const body = response.body.map(r => r)
  expect(body).not.toContain(newBlog)
})

afterAll(() => {
  mongoose.connection.close()
})
