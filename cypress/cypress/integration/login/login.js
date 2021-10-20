///<reference types="Cypress"/>

describe('Guess User logs in the system', () => {
    before(() => cy.fixture('user_data').then(data => globalThis.data = data));
    beforeEach(() => {
        cy.visit('/');
    });

    it('Guess user logs in the system successfully', () => {
        cy.loginNoToken().wait(500);
        cy.url().should('not.include', 'login');
        cy.getCookie('token').should('exist');
    });

    it('User views password on login page', () => {
        cy.get('#password').type('123456');
        cy.get('#password+i').click();
        cy.get('#password').should('have.attr', 'type', 'text');
        cy.get('#password+i').click();
        cy.get('#password').should('have.attr', 'type', 'password');
    });

    it('[Negative] Guest user doesn\'t fill email field', () => {
        cy.intercept('POST','http://127.0.0.1:3000/login_user').as('getResp');
        cy.get('#password').type(data.password);
        cy.contains('button', 'Log in').click();
        cy.wait('@getResp').then(data => {
            expect(data.response.body.code).eq(400);
            cy.flashMessage('Please fill all fields');
        });
    });

    it('[Negative] Guest user doesn\'t fill password field', () => {
        cy.intercept('POST','http://127.0.0.1:3000/login_user').as('getResp');
        cy.get('#email').type(data.email);
        cy.contains('button', 'Log in').click();
        cy.wait('@getResp').then(data => {
            expect(data.response.body.code).eq(400);
            cy.flashMessage('Please fill all fields');
        });
    });

    it('[Negative] Guest user uses unregistered email', () => {
        cy.intercept('POST','http://127.0.0.1:3000/login_user').as('getResp');
        cy.loginFillFields(data.unregisteredEmail, data.password);
        cy.wait('@getResp').then(data => {
            expect(data.response.body.code).eq(401);
            cy.flashMessage('Incorrect password or login');
        });
    });

    it('[Negative] Guest user uses incorrect password', () => {
        cy.intercept('POST','http://127.0.0.1:3000/login_user').as('getResp');
        cy.loginFillFields(data.email, '5');
        cy.wait('@getResp').then(data => {
            expect(data.response.body.code).eq(401);
            cy.flashMessage('Incorrect password or login');
        });
    });  
});