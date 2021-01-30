describe('Note ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/blogs/reset') 
    const user = {
      name: 'Tester',
      username: 'Tester',
      password: 'Tester'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })
  
  it('front page can be opened', function() {
    cy.contains('Blogs')
  })

  it('log in button is shown', function() {
    cy.contains('log in').click()
  }) 

  describe('When logged in', function() {

    beforeEach(function() {
      cy.contains('log in').click()
      cy.get('#username').type('Tester')
      cy.get('#password').type('Tester')
      cy.get('#login-button').click()
    })

    it('a new blog can be created and liked', function() {
      cy.contains('new blog').click()
      cy.get('.titleInput').type('a blog created by cypress')
      cy.get('.authorInput').type('cypress')
      cy.get('.urlInput').type('testsite.com')
      cy.contains('create').click()
      cy.contains('a blog created by cypress')
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains(1)
    })

    it('The user can delete blogs he added', function() {
      cy.contains('new blog').click()
      cy.get('.titleInput').type('a blog created by cypress')
      cy.get('.authorInput').type('cypress')
      cy.get('.urlInput').type('testsite.com')
      cy.contains('create').click()
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('view').should('not.exist')
    })

    it('Blogs should be shown from most liked to least liked', function() {
      cy.contains('new blog').click()
      cy.get('.titleInput').type('a blog created by cypress')
      cy.get('.authorInput').type('cypress')
      cy.get('.urlInput').type('testsite.com')
      cy.contains('create').click()
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('new blog').click()
      cy.get('.titleInput').type('a second blog created by cypress')
      cy.get('.authorInput').type('cypress')
      cy.get('.urlInput').type('testsite2.com')
      cy.contains('create').click()
      cy.get('.blogList').eq(0).should('contain', 1)
    })

  })

})

describe('Login', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('logging in works', function() {
    cy.contains('log in').click()
    cy.get('#username').type('Tester')
    cy.get('#password').type('Tester')
    cy.get('#login-button').click()

    cy.contains('Tester logged in')
  })

  it('login fails with wrong credentials', function() {
    cy.contains('log in').click()
    cy.get('#username').type('Tester')
    cy.get('#password').type('wrongpassword')
    cy.get('#login-button').click()

    cy.get('.error').should('contain', 'Wrong username or password')
    cy.get('.error').should('have.css', 'backgroundColor', 'rgb(255, 0, 0)')
  })

})