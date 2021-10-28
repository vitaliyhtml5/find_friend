///<reference types="Cypress" />

describe('New guest user signs up into the system on the second step', () => {
    before(() => cy.fixture('user_data').then(data => globalThis.data = data));
    beforeEach(() => {
        cy.visit('/signup');
        cy.get('#name').type(data.newUser.name[0]);
        cy.get('#age').type(data.newUser.age[1]);
        cy.get('#hobby').type(data.newUser.hobby[0]);
        cy.contains('button', 'Next').click();
    });

    it('Guest user completes signup successfully', () => {
        cy.intercept('/create_account').as('accountCreated');    
        cy.intercept('/login_user').as('getToken');

        cy.getNewEmail().then(newEmail => {
            cy.get('#email').type(newEmail).should('have.value', newEmail);
            cy.get('#password').type(1).should('have.value', 1);
            cy.get('#confirm-password').type(1).should('have.value', 1);
            cy.contains('button', 'Create account').click({force: true});
            cy.wait('@accountCreated').its('response.body.message').should('eq', 'account was created');
            cy.wait('@getToken').its('response.body.token').should('not.be.empty');
            cy.url().should('not.include', '/signup');
            cy.getCookie('token').should('exist');
            cy.reload();
            cy.url().should('not.include', '/login');
        });
    });
    it('Guest user views password', () => {
        cy.viewPassword('#password');
        cy.viewPassword('#confirm-password');
    });

    // Negative scenarios
    // Email
    it('[Negative] Guest user uses registered email', () => {
        let randomEmail = Math.floor(Math.random() * data.registeredUser.length);
        let randomPassword = Math.floor(Math.random() * data.correctPassword.length);
        cy.intercept('/check_email').as('usedEmail');

        fillFields(data.registeredUser[randomEmail].email, data.correctPassword[randomPassword], data.correctPassword[randomPassword]);
        cy.contains('button', 'Create account').click({force: true});
        cy.wait('@usedEmail').its('response.body.message').should('eq', 'email is used');
        cy.checkAlert('Email is already used');
        cy.url().should('include', '/signup');
    });

    it('[Negative] Guest user uses incorrect format of email', () => {
        let randomEmail = Math.floor(Math.random() * data.incorrectEmail.length);
        let randomPassword = Math.floor(Math.random() * data.correctPassword.length);

        fillFields(data.incorrectEmail[randomEmail], data.correctPassword[randomPassword], data.correctPassword[randomPassword]);
        cy.contains('button', 'Create account').click({force: true});
        cy.checkAlert('Email format is incorrect');
        cy.url().should('include', '/signup');
    });

    // Password
    it('[Negative] Guest user uses different values of password', () => {
        let randomEmail = Math.floor(Math.random() * data.correctEmail.length);

        fillFields(data.correctEmail[randomEmail], data.correctPassword[0], data.correctPassword[1]);
        cy.contains('button', 'Create account').click({force: true});
        cy.checkAlert('The passwords are not equal');
        cy.url().should('include', '/signup');
    });

    // All
    it('[Negative] Guest user tries to complete signup with empty fields on the 2nd step', () => {
        fillFields(data.correctEmail[0], data.correctPassword[0], data.correctPassword[0]);
        cy.emptyField('#email', 'Create account');
        cy.url().should('include', '/signup');
        clearAllFields();
        fillFields(data.correctEmail[0], data.correctPassword[0], data.correctPassword[0]);
        cy.emptyField('#password', 'Create account');
        cy.url().should('include', '/signup');
        clearAllFields();
        fillFields(data.correctEmail[0], data.correctPassword[0], data.correctPassword[0]);
        cy.emptyField('#confirm-password', 'Create account');
        cy.url().should('include', '/signup');
    });

    it('[Negative] Guest user tries to complete signup with incorrect length of fields', () => {
        fillFields(data.correctEmail[0], data.correctPassword[0], data.correctPassword[0]);
        cy.incorrectLengthText('#email', data.incorrectEmailLength[0], 'Create account');
        cy.url().should('include', '/signup');
        clearAllFields();
        fillFields(data.correctEmail[0], data.correctPassword[0], data.correctPassword[0]);
        cy.incorrectLengthText('#password', data.incorrectPasswordLength[0], 'Create account');
        cy.url().should('include', '/signup');
        clearAllFields();
        fillFields(data.correctEmail[0], data.correctPassword[0], data.correctPassword[0]);
        cy.incorrectLengthText('#confirm-password', data.incorrectPasswordLength[0], 'Create account');
        cy.url().should('include', '/signup');
    });

    function fillFields(email, password, confirmPassword) {
        cy.get('#email').type(email);
        cy.get('#password').type(password);
        cy.get('#confirm-password').type(confirmPassword);
    }
    function clearAllFields() {
        cy.get('.second-step input').each(field => cy.wrap(field).clear());
    }
});