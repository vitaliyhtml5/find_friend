Cypress.Commands.add('getProfile', (id) => {
    cy.request({
        method: 'GET',
        url: `/get_profile_data?id=${id}`,
        headers: {
            'Content-type': 'application/json'
        }
    }).then(res => res.body);
});