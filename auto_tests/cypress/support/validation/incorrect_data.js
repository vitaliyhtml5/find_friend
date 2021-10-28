Cypress.Commands.add('incorrectDataText', (field, value, btn) => {
    cy.get(field).clear().type(value);
    cy.contains('button', btn).click();
    cy.checkAlert('Only English chars can be used');
})

Cypress.Commands.add('incorrectDataAge', (field, value, btn) => {
    cy.get(field).clear().type(value);
    cy.contains('button', btn).click();
    cy.checkAlert('Age should be a number');
})