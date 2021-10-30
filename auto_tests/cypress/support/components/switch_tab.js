Cypress.Commands.add('switchTab', (mainTab, tab, menu) => {
    cy.get('.aside-list li').eq(tab).click();
    cy.wait(500);
    cy.get('.aside-list li').eq(mainTab).click().should('have.class', 'aside-checked');
    cy.get(menu).should('not.have.css', 'display', 'none');
});