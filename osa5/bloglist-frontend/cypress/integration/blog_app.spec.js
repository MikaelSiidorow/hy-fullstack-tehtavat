describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Teemu Teekkari',
      username: 'tteekkari',
      password: 'mulkero'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('tteekkari')
      cy.get('#password').type('mulkero')
      cy.get('#login-button').click()

      cy.contains('Teemu Teekkari logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('admin')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'logged in')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'tteekkari', password: 'mulkero' })
      })

      it('A blog can be created', function() {
        cy.contains('create new blog').click()
        cy.get('#title').type('Teekkarius')
        cy.get('#author').type('Teemu Teekkari')
        cy.get('#url').type('lutrejects.fi')
        cy.get('#submit-blog-button').click()

        cy.contains('Teekkarius Teemu Teekkari')
      })

      describe('When a blog exists', function() {
        beforeEach(function() {
          cy.createBlog({
            title: 'Teekkarius',
            author: 'Teemu Teekkari',
            url: 'lutrejects.fi',
            likes: 150,
          })
        })

        it('The blog can be liked', function() {

          cy.contains('Teekkarius').parent().contains('view').click()
          cy.contains('Teekkarius').parent().contains('150')
          cy.contains('Teekkarius').parent().contains('like').click()
          cy.contains('Teekkarius').parent().contains('151')
        })

        it('The blog can be removed', function() {

          cy.contains('Teekkarius').parent().contains('view').click()
          cy.contains('Teekkarius').parent().contains('remove').click()

          cy.get('html').should('not.contain', 'Teekkarius')
        })
      })

      describe('When multiple blogs exist', function() {
        beforeEach(function() {
          cy.createBlog({
            title: 'Teekkarius',
            author: 'Teemu Teekkari',
            url: 'lutrejects.fi',
            likes: 150,
          })
          cy.createBlog({
            title: 'Mulkerointi 101',
            author: 'Teemu Teekkari',
            url: 'aaltorejects.fi',
            likes: 98,
          })
          cy.createBlog({
            title: 'testiblogi',
            author: 'Teemu Teekkari',
            url: 'localhost',
            likes: 100,
          })
        })

        it('Blogs are initially sorted correctly by likes', function() {
          cy.get('#blogs-container').children()
            .then( ($div) => {
              const likes = [...$div].map(el => {
                cy.wrap(el).contains('view').click()
                return cy.wrap(el).contains('like').parent().invoke('text').then(parseInt)
              })
              cy.wrap(likes).should('equal', likes.sort())
            })
        })

        it('Blogs are sorted correctly after a blog is liked three times', function() {
          cy.contains('Mulkerointi').parent().contains('view').click()
          cy.contains('Mulkerointi').parent().contains('like').click().click().click()
          cy.contains('Mulkerointi').parent().contains('hide').click()

          cy.get('#blogs-container').children()
            .then( ($div) => {
              const likes = [...$div].map(el => {
                cy.wrap(el).contains('view').click()
                return cy.wrap(el).contains('like').parent().invoke('text').then(parseInt)
              })
              cy.wrap(likes).should('equal', likes.sort())
            })
        })
      })
    })
  })
})