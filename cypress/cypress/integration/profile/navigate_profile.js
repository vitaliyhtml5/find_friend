///<reference types="Cypress" />

describe('User navigates to profile page', () => {
    before(() => cy.fixture('user_data').then(data => globalThis.data = data));
    beforeEach(() => {
        cy.getToken();
    });

    it('User navigates to profile page from index', () => {
        cy.visit('/');
        cy.get('.header-profile a[href="/profile"]').click();
        cy.url().should('include','profile');
    });

    it('User backs to index page from profile', () => {
        cy.visit('/profile');
        cy.get('.header-wrap a[href="/"]').click();
        cy.url().should('not.include','profile');
    });
});