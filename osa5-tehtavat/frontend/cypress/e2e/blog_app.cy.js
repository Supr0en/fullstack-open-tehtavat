describe('Blog', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/tests/reset');
        cy.request('POST', 'http://localhost:3003/api/users', {
            username: 'admin',
            name: 'Erik Ruotsalainen',
            password: '@admin',
        });
        cy.visit('http://localhost:3000');
    });

    it('front page can be opened', function () {
        cy.contains('Log in to application');
    });

    describe('login to app', function () {
        it('Login succeeded', function () {
            cy.get('#username').type('admin');
            cy.get('#password').type('@admin');
            cy.get('#submit').click();
            cy.contains('You have been logged in successfully');
        });
        it('login failed', function () {
            cy.get('#username').type('nakki');
            cy.get('#password').type('muussi');
            cy.get('#submit').click();
            cy.contains('Invalid username or password');
        });
    });

    describe('When logged in', function () {
        beforeEach(function () {
            cy.get('#username').type('admin');
            cy.get('#password').type('@admin');
            cy.get('#submit').click();
        });
        it('Create new blog', function () {
            cy.get('#newblog').click();
            cy.get('#blogForm');
            cy.get('#title').type('Cypress');
            cy.get('#author').type('test');
            cy.get('#url').type('https://cypresstest.com');
            cy.get('#newblog').click();
            cy.contains('Cypress. Blog by test');
        });
        it('Blogs can be liked', function () {
            cy.get('#newblog').click();
            cy.get('#blogForm');
            cy.get('#title').type('cypress');
            cy.get('#author').type('test');
            cy.get('#url').type('https://cypresstest.com');
            cy.get('#newblog').click();
            cy.get('#view-btn').click();
            cy.get('#like-btn').click();
            cy.contains('Likes: 1');
        });
        it('Blogs can be deleted', function () {
            cy.get('#newblog').click();
            cy.get('#blogForm');
            cy.get('#title').type('Cypress');
            cy.get('#author').type('test');
            cy.get('#url').type('https://cypresstest.com');
            cy.get('#newblog').click();
            cy.get('#view-btn').click();
            cy.get('#delete-btn').click();
        });
        it('blogs sorted by likes', function () {
            cy.get('#newblog').click();
            cy.get('#blogForm');
            cy.get('#title').type('Cypress');
            cy.get('#author').type('test');
            cy.get('#url').type('https://cypresstest.com');
            cy.get('#newblog').click();
            cy.get('#view-btn').click();
            cy.get('#newblog').click();
            cy.get('#blogForm');
            cy.get('#title').type('Cypress');
            cy.get('#author').type('test 2');
            cy.get('#url').type('https://cypresstest.com');
            cy.get('#newblog').click();
            cy.get('.blog #view-btn').eq(1).should('contain', 'View').click();
            cy.get('.blog #like-btn').eq(1).should('contain', 'Like').click();
            cy.reload();
        });
    });
});
