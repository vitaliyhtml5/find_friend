///<reference types="Cypress"/>
describe('User edits info about friend', () => {
    before(() => cy.fixture('user_data').then(data => globalThis.data = data));
    beforeEach(() => {
        cy.getToken();
        cy.visit('/');
        cy.contains('.aside-list>li', 'Edit friend').click();
    });

    it('User chooses a friend', () => {
        cy.getAllUsers().then(res => {
            const nameArr = res.map(item => item.name);
            cy.get('.change-name-friend .name-choose').each((el,index) => {
                expect(el.text()).eq(nameArr[index]);
            });
        });
    });

    it('User views info after choosing a friend', () => {
        cy.getAllUsers().then(res => {
            let random = Math.floor(Math.random() * res.length);
            const userData = [];
            cy.get('.change-name-friend').click({force: true});
            cy.get('.name-choose').eq(random).click({force: true});
            cy.get('.change_friend input').each(el => userData.push(el.val())).then(() => {
                expect(res[random].name).eq(userData[0]);
                expect(String(res[random].age)).eq(userData[1]);
                expect(res[random].hobby).eq(userData[2]);
            });
        });
    });

    it('User edits info successfully', () => {
        cy.getAllUsers().then(res => {
            let random = Math.floor(Math.random() * res.length);
            let randomData = Math.floor(Math.random() * 5);
            const oldUser = [res[random].name, res[random].age, res[random].hobby];

            cy.intercept('PUT','http://127.0.0.1:3000/update_user').as('getResp');
            cy.editFriend(random, data.user.name[randomData], data.user.age[randomData], data.user.hobby[randomData]);
            cy.flashMessage('Data was changed');
            cy.get('.change_friend input').each(el => {
                cy.wrap(el).should('not.have.value');
            })
            cy.wait('@getResp').then(res => {
                expect(res.response.body.code).eq(200);
            });
            cy.getAllUsers().then(user => {
                expect(user[random].name).eq(data.user.name[randomData]);
                expect(user[random].age).eq(data.user.age[randomData]);
                expect(user[random].hobby).eq(data.user.hobby[randomData]);
                // Postcondition
                cy.request({
                    method: 'PUT',
                    url: 'http://127.0.0.1:3000/update_user',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: {
                        userId: res[random].id,
                        name: oldUser[0],
                        age:  oldUser[1],
                        hobby: oldUser[2]
                    }
                });
            });
        });
    });

    it('[Negative] User doesn\'t choose a friend', () => {
        cy.intercept('PUT', 'http://127.0.0.1:3000/update_user').as('getRes');
        cy.contains('.change_friend button','Confirm').click();
        cy.flashMessage('Choose a friend');
        cy.wait('@getRes').then(res => {
            expect(res.response.body.code).eq(400);
        });
    });

    it('[Negative] Empty state validation', () => {
        cy.getAllUsers().then(res => {
            let random = Math.floor(Math.random() * res.length);
            cy.intercept('PUT', 'http://127.0.0.1:3000/update_user').as('getRes');
            cy.get('.change_friend input').each((el,index) => {
                cy.get('.change-name-friend').click({force: true});
                cy.get('.name-choose').eq(random).click({force: true});
                cy.wrap(el).clear({force: true});
                cy.contains('.change_friend button','Confirm').click();
                cy.flashMessage('Please fill all fields');
                cy.wait('@getRes').then(res => {
                    expect(res.response.body.code).eq(400);
                })
                // Postcondition
                cy.wrap(el).type('lorem');
            });
        });    
    });
});