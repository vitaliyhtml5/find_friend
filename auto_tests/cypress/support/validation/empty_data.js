Cypress.Commands.add('emptyField', (field, btn) => {
    cy.get(field).clear().should('not.have.value');
    cy.contains('button', btn).click();
    cy.checkAlert('Please fill all fields');
});