Cypress.Commands.add('getNewEmail', () => {
    getUniqueEmail();
    function getUniqueEmail() {
        let random = Math.floor(Math.random() * 1000);
        let email = `tunique${random}@test.com`;
        cy.request({
            method: 'POST',
            url: '/login_user',
            headers: {
                'Content-type': 'application/json'
            }, 
            failOnStatusCode: false,
            body: {
                email: email,
                password: 1
            }
        }).then(res => {
            if (res.body.message === 'incorrect credentials') {
                return email;
            } else {
                getUniqueEmail();
            }
        });
    }
});