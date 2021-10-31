///<reference types="Cypress" />

describe('User deletes a friend in Delete friends tab', () => {
    let idUser;
    let random = length => Math.floor(Math.random() * length);
    before(() => {
        cy.fixture('user_data').then(data => {
            globalThis.data = data;
            idUser = data.registeredUser[0].id;
            cy.getToken(data.registeredUser[0].email, data.registeredUser[0].password).then(token => cy.setCookie('token', token));
        });
    });
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('token');
        cy.visit('/');
        cy.contains('.aside-list li', 'Delete friends').click();
    });

    it('User navigates to Delete friends tab from another tab in Main menu', () => {
        cy.switchTab(3, 2, '.delete_friend');
    });

    it('User chooses a friend', () => {
        cy.getFriends(idUser).then(res => {
            let randomUser = random(res.length);
            cy.switchTab(3, 2, '.delete_friend').then(() => {
                cy.wait(500);
                cy.get('.list-name').click();
                cy.get('.list-name li').eq(randomUser).click({force: true});
                cy.get('.delete_friend td').eq(0).should('have.text', res[randomUser - 1].name);
                cy.get('.delete_friend td').eq(1).should('have.text', res[randomUser - 1].age);
                cy.get('.delete_friend td').eq(2).should('have.text', res[randomUser  -1].hobby);
            });    
        });
    });

    it('User deletes a friend successfully', () => {
        addFriend();
        cy.getFriends(idUser).then(res => {
            cy.switchTab(3, 2, '.delete_friend').then(() => {
                cy.wait(500);
                cy.get('.list-name').click();
                cy.get('.list-name li').eq(res.length - 1).click({force: true});
                cy.wait(500);
                cy.contains('button', 'Delete a friend').click();
                cy.checkAlert('Friend was removed');
                cy.get('.delete_friend td').eq(0).should('not.have.text');
                cy.get('.delete_friend td').eq(1).should('not.have.text');
                cy.get('.delete_friend td').eq(2).should('not.have.text');
            });    
        });
    });

    //Negative scenarios
    it('[Negative] User tries to delete a friend when friend is not chosen', () => {
        cy.contains('button', 'Delete a friend').click();
        cy.checkAlert('Please choose a friend');
    });

    it(`User views empty state if friends haven't been added`, () => {
        cy.emptyStateAlt('.delete_friend', '.name-friend');
    });

    function addFriend() {
        cy.request({
            method: 'POST',
            url: '/add_user',
            headers: {
                'Content-type': 'application/json'
            },
            body: {
                name: data.newUser.name[0],
                age: data.newUser.age[0],
                hobby: data.newUser.hobby[0],
                user_id: idUser
            }
        });
    }
});