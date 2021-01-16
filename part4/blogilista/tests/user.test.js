const bcrypt = require('bcrypt')
const User = require('../models/user')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const mongoose = require('mongoose')

describe('Testing users', () => {
  test('creation succeeds with a fresh username', async () => {
    const newUser = {
      username: 'Martti',
      name: 'Martti',
      password: 'salainen',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')
    const usernames = response.body.map(u => u.username)
    expect(usernames).toContain('Martti')
  })

  test('Password has to have a minimum length of 3', async () => {
    const newUser = {
      username: 'assad',
      name: 'Test subject',
      password: 'sa'
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

    const response = await api.get('/api/users')
    const usernames = response.body.map(r => r.username)
    expect(usernames).not.toContain(newUser.username)
  })
  
  test('Username has to have a minimum length of 3', async () => {
    const newUser = {
      username: 'as',
      name: 'Test subject 2',
      password: 'sdasdasa'
    }
    
    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

    const response = await api.get('/api/users')

    const passwords = response.body.map(r => r.password)
    expect(passwords).not.toContain(newUser.password)
  })
  

})