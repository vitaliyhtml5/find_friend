Cypress.Commands.add('getFriends', id => {
    cy.request({
        method: 'GET',
        url: `/show_all?user_id=${id}`
    }).then(data => data.body);
});