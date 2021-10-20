// Flash messages
Cypress.Commands.add('flashMessage', (text) => {
    cy.get('.flash-close').should('have.text', text);
    cy.wait(3500);
    cy.get('.flash-close').should('not.exist');
});

// Get users
Cypress.Commands.add('getAllUsers', (list, item) => {
    cy.request({
        method: 'GET',
        url: 'http://127.0.0.1:3000/show_users'
    }).then(res => res.body);
});

Cypress.Commands.add('createTempUser', () => {
    getTempId();
    function getTempId() {
        cy.request({
            method: 'POST',
            url: 'http://127.0.0.1:3000/add_user',
            headers: {
                'content-type': 'application/json'
            },
            body: {
                name: 'tempUser',
                age: 25,
                hobby: 'tempHobby'
            }
        });
        cy.request({
            method: 'GET',
            url: 'http://127.0.0.1:3000/show_users'
        }).then(res => {
            if (res.body[res.body.length - 1].name === 'tempUser') return res.body[res.body.length - 1].id;
            else  getTempId();
        });
    }
});

Cypress.Commands.add('deleteTempUser', userTempId => {
    cy.request({
        method: 'DELETE',
        url: 'http://127.0.0.1:3000/remove_user',
        headers: {
			'content-type': 'application/json'
		},
        body: {
            userId: userTempId
        }
    });
});