///<reference types="Cypress"/>
describe('User gets error page', () => {
    before(() => cy.fixture('user_data').then(data => globalThis.data = data));
    
    it('Unauthorized user gets 401 error after navigating to profile page', () => {
        cy.intercept('GET','http://127.0.0.1:3000/profile').as('getError');
        cy.visit('/profile', {failOnStatusCode: false});
        cy.wait('@getError').then(res => {
            expect(res.response.statusCode).eq(401);
            cy.get('.error-page_btn[href="/login"]').click();
            cy.url().should('include', 'login');
        });
    });

    it('Authorized user gets 403 error after navigating to admin page', () => {
        cy.intercept('GET','http://127.0.0.1:3000/admin').as('getError');
        cy.getToken();
        cy.visit('/admin',{failOnStatusCode:false});
        cy.wait('@getError').then(res => {
            expect(res.response.statusCode).eq(403);
        });
    });

    it('User gets 403 error after navigating to admin page', () => {
        let random = '';
        for(let i = 0; i < 2; i++) {
            random = random + Math.random().toString(36).substr(2,3);
        }
        cy.intercept('GET',`http://127.0.0.1:3000/${random}`).as('getError');
        cy.visit(`/${random}`,{failOnStatusCode:false});
        cy.wait('@getError').then(res => {
            expect(res.response.statusCode).eq(404);
        });
    });
});