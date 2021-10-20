///<reference types="Cypress"/>
describe('User removes a friend', () => {
    before(() => cy.fixture('user_data').then(data => globalThis.data = data));
    beforeEach(() => {
        cy.getToken();
        cy.visit('/');
        cy.contains('.aside-list>li','Delete friends').click();
    });

    it('User chooses a friend', () => {
        cy.getAllUsers().then(res => {
            const userNames = res.map(item => item.name);
            cy.get('.delete_friend .name-choose').each((el, index) => {
                expect(el.text()).eq(userNames[index]);
            });
        });
    });

    it('User views info after choosing a friend', () => {
        cy.getAllUsers().then(res => {
            let random = Math.floor(Math.random() * res.length);
            cy.get('.delete-name-friend').click({force: true});
            cy.get('.delete-name-friend .name-choose').eq(random).click({force:true});
            cy.get('.delete_friend td').eq(0).invoke('text').should('eq',res[random].name);
            cy.get('.delete_friend td').eq(1).invoke('text').should('eq',String(res[random].age));
            cy.get('.delete_friend td').eq(2).invoke('text').should('eq',res[random].hobby);
        });
    });

    it('User remove a friend successfully', () => {
        cy.createTempUser().then(tempUserId => {
            cy.reload();
            cy.contains('.aside-list>li','Delete friends').click();
            cy.getAllUsers().then(res => {
                expect(res[res.length - 1].id).eq(tempUserId);
            });
            cy.intercept('DELETE','http://127.0.0.1:3000/remove_user').as('getRes');    
            cy.get('.delete-name-friend').click({force: true});
            cy.get('.delete-name-friend .name-choose').last().click({force: true});
            cy.contains('.delete_friend button', 'Delete a friend').click();
            cy.flashMessage('Friend was removed');
            cy.wait('@getRes').then(res => {
                expect(res.response.body.code).eq(200);
            });
            cy.getAllUsers().then(res => {
               const idArr = res.map(item => item.id);
               expect(idArr.includes(tempUserId)).eq(false);
            });     
        });
    });

    it('[Negative] User doesn\'t choose a friend', () => {
        cy.intercept('DELETE','http://127.0.0.1:3000/remove_user').as('getRes');
        cy.contains('.delete_friend button', 'Delete a friend').click();
        cy.flashMessage('Choose a friend');
        cy.wait('@getRes').then(res => {
            expect(res.response.body.code).eq(400);
        });
    });
});