///<reference types="Cypress" />

describe('User logs out of the System', () => {
    it('User logs out of the System successfully', () => {
        cy.getToken();
        cy.visit('/');
        cy.get('.header-profile > button').click();
        cy.url().should('include','login');
        cy.getCookie('token').should('not.exist');
    });
});