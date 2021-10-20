Cypress.Commands.add('loginFillFields', (email,password) => {
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.contains('button', 'Log in').click();
});

Cypress.Commands.add('loginNoToken', () => {
    cy.fixture('user_data').then(data => globalThis.data = data);
    cy.get('#email').type(data.email);
    cy.get('#password').type(data.password);
    cy.contains('button', 'Log in').click();
});

Cypress.Commands.add('getToken', () => {
     cy.request( {
            method: 'POST',
            url: 'http://127.0.0.1:3000/login_user',
            Headers: {
                'Content-Type': 'application/json'
            },
            body: {
                email: "test@test.com",
                password: "1"
            }
        })
        .then(res => {
            var cookieArr = res.headers['set-cookie'][0].split(';');
            return cookieArr[0].slice(6);
        });
});