Cypress.Commands.add('checkAlert', text => {
    cy.get('.flash').should('be.visible').and('have.text', text);
    cy.wait(3500);
    cy.get('.flash').should('not.be.visible');
});