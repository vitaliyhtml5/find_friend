Cypress.Commands.add('getSortData', (endpoint, column, id) => {
    cy.request({
        method: 'GET',
        url: `/${endpoint}?column=${column}&user_id=${id}`
    }).then(data => data.body);
});