Cypress.Commands.add('incorrectLengthText', (field, value, btn) => {
    cy.get(field).clear().type(value).invoke('val').its('length').should('be.gt', 20);
    cy.contains('button', btn).click();
    cy.checkAlert('Max length is 20 chars');
})

Cypress.Commands.add('incorrectLengthAge', (field, value, btn) => {
    cy.get(field).clear().type(value).invoke('val').its('length').should('be.gt', 3);
    cy.contains('button', btn).click();
    cy.checkAlert('Max length for age is 3 chars');
})