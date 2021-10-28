///<reference types="Cypress"/>

describe('Guest user makes login into the system', () => {
    before(() => cy.fixture('user_data').then(data => globalThis.data = data));
    beforeEach(() => cy.visit('/login'));

    it('Guest user navigates to Signup page from Login page', () => {
        cy.contains('.header-link', 'Sign up').click();
        cy.url().should('include', '/signup');
    });

    it('Guest user makes login into the system successfully', () => {
        let random = Math.floor(Math.random() * data.registeredUser.length);
        cy.intercept('/get_access').as('getAccess');

        cy.get('#email').type(data.registeredUser[random].email).should('have.value', data.registeredUser[random].email);
        cy.get('#password').type(data.registeredUser[random].password).should('have.value', data.registeredUser[random].password);
        cy.contains('button', 'Log in').click();
        cy.url().should('not.include', '/login');
        cy.wait('@getAccess').its('response.body.message').should('eq', 'access is allowed');
        cy.getCookie('token').should('exist');
        cy.reload();
        cy.url().should('not.include', '/login');
    });

    it('Guest user views password', () => {
        cy.viewPassword('#password');
    });

     // Negative scenarios
    it('[Negative] Guest user uses unregistered email', () => {
        cy.intercept('/login_user').as('loginUser');
        fillForm(data.newUser.email[0], data.correctPassword[0]);
        cy.wait('@loginUser').its('response.body.message').should('eq', 'incorrect credentials');
        cy.checkAlert('Incorrect password or login');
        cy.url().should('include', '/login');
    });

    it('[Negative] Guest user uses wrong password for account', () => {
        cy.intercept('/login_user').as('loginUser');
        fillForm(data.registeredUser[0].email, data.correctPassword[0]);
        cy.wait('@loginUser').its('response.body.message').should('eq', 'incorrect credentials');
        cy.checkAlert('Incorrect password or login');
        cy.url().should('include', '/login');
    });

    it('[Negative] Guest user tries to make login with empty fields', () => {
        fillFields(data.registeredUser[0].email, data.registeredUser[0].password);
        cy.emptyField('#email', 'Log in');
        cy.url().should('include', '/login');
        cy.get('.login-wrap input').each(fields => cy.wrap(fields).clear());
        fillFields(data.registeredUser[0].email, data.registeredUser[0].password);
        cy.emptyField('#password', 'Log in');
        cy.url().should('include', '/login');

        function fillFields(email, password) {
            cy.get('#email').type(email);
            cy.get('#password').type(password);
        }
    });

    function fillForm(email, password) {
        cy.get('#email').type(email);
        cy.get('#password').type(password);
        cy.contains('button', 'Log in').click();
    }
});