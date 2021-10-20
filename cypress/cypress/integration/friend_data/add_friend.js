///<reference types="Cypress"/>
describe('User adds a friend', () => {
    before(() => cy.fixture('user_data').then(data => globalThis.data = data));
    beforeEach(() => {
        cy.getToken();
        cy.visit('/');
        cy.contains('.aside-list>li', 'Add friends').click();
    });

    it('User adds a new friend successfully', () => {
        const userData = [data.user.name[Math.floor(Math.random()*5)], data.user.age[Math.floor(Math.random()*5)],data.user.hobby[Math.floor(Math.random()*5)]];
        cy.intercept('http://127.0.0.1:3000/add_user').as('addUser');
        cy.get('.add_friend input').eq(0).type(userData[0]);
        cy.get('.add_friend input').eq(1).type(userData[1]);
        cy.get('.add_friend input').eq(2).type(userData[2]);
        cy.contains('.add_friend button', 'Add a friend').click();
        cy.flashMessage('Friend was added');
        cy.wait('@addUser').then(res => {
            expect(res.response.body.code).eq(201);
        });
        cy.request({
            method: 'GET',
            url: 'http://127.0.0.1:3000/show_users'
        }).then(res => {
            const newData = res.body[res.body.length-1];
            expect(newData.name).eq(userData[0]);
            expect(newData.age).eq(userData[1]);
            expect(newData.hobby).eq(userData[2]);
            // Postcondition
            cy.deleteTempUser(newData.id);
        });
    });

    it('[Negative] Empty fields verification', () => {
        cy.get('.add_friend input').eq(0).type('lorem');
        cy.get('.add_friend input').eq(1).type('25');
        cy.get('.add_friend input').eq(2).type('lorem');
        cy.intercept('http://127.0.0.1:3000/add_user').as('addUser');
        cy.get('.add_friend input').each(el => {
            cy.wrap(el).clear();
            cy.contains('.add_friend button', 'Add a friend').click();
            cy.flashMessage('Please fill all fields');
            cy.wait('@addUser').then(res => {
                expect(res.response.body.code).eq(400);
                cy.wrap(el).type('lorem');
            });
        });
    });
});