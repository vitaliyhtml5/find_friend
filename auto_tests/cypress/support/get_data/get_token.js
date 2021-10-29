Cypress.Commands.add('getToken', (userEmail, userPassword) => {
    cy.request({
        method: 'POST',
        url: '/login_user',
        headers: {
            'Content-type': 'application/json'
        },
        body: {
            email: userEmail,
            password: userPassword
        }
    }).then(res => res.body.token);
});