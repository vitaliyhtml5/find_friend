Cypress.Commands.add('viewPassword', field => {
    cy.get(field).type('Hello').should('have.attr', 'type', 'password');
    cy.get(`${field}+i`).click({force: true});
    cy.get(field).should('not.have.attr', 'type', 'password');
    cy.get(`${field}+i`).click({force: true});
    cy.get(field).should('have.attr', 'type', 'password');
});