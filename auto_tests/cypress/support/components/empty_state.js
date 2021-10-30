Cypress.Commands.add('emptyStateMain', (section, content) => {
    cy.fixture('user_data').then(data => globalThis.data = data);
    cy.getToken(data.registeredUserEmpty.email, data.registeredUserEmpty.password).then(token => {
        cy.setCookie('token', token);
        cy.reload();
        cy.get(section).should('have.class', 'empty-state-main');
        cy.get(content).should('not.be.visible');
    });
})

Cypress.Commands.add('emptyStateAlt', (section, content) => {
    cy.fixture('user_data').then(data => globalThis.data = data);
    cy.getToken(data.registeredUserEmpty.email, data.registeredUserEmpty.password).then(token => {
        cy.setCookie('token', token);
        cy.reload();
        cy.get(section).should('have.class', 'empty-state-alt');
        cy.get(content).should('not.be.visible');
    });
})