///<reference types="Cypress"/>

describe('User logs out from the system', () => {
    before(() => {
        cy.fixture('user_data').then(data => globalThis.data = data);        
    });
    beforeEach(() => {
        cy.getToken(data.registeredUser[0].email, data.registeredUser[0].password).then(token => {
            cy.setCookie('token', token);
            Cypress.Cookies.preserveOnce('token');
        });
    });

    it('User logs out on the Main page', () => {
        cy.visit('/');
        logOut();
    });

    it('User logs out on Profile page', () => {
        cy.visit('/profile');
        logOut();
    });

    function logOut() {
        cy.wait(500);
        cy.get('button[title="Logout"]').click({force:true});
        cy.getCookie('token').should('not.exist');
        cy.url().should('include', '/login');
        cy.reload();
        cy.url().should('include', '/login');
    }
});