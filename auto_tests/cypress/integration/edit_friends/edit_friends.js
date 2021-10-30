///<reference types="Cypress"/>

//Errors occurs when runner starts 2+ tests due to Cypress limitation with customized dropdowns

describe('User edits a friend in Edit friends tab', () => {
    let idUser;
    let random = length => Math.floor(Math.random() * length);
    const field = ['.change_friend label:nth-child(2) input', '.change_friend label:nth-child(3) input', '.change_friend label:nth-child(4) input'];
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
        cy.contains('.aside-list li', 'Edit friends').click();
    });

    it('User navigates to Edit friends tab from another tab in Main menu', () => {
        cy.switchTab(2, 3, '.change_friend');
    });
    
    it('User chooses a friend', () => {
        cy.getFriends(idUser).then(res => {
            let randomUser = random(res.length);
            cy.get('.list-name').click();
            cy.get('.list-name li').eq(randomUser).click({force: true});
            cy.get(field[0]).should('have.value', res[randomUser - 1].name);
            cy.get(field[1]).should('have.value', res[randomUser - 1].age);
            cy.get(field[2]).should('have.value', res[randomUser  -1].hobby);
        });
    });

    it('User edits a friend successfully', () => {
        const dataArr = [data.newUser.name[random(data.newUser.name.length)], data.newUser.age[random(data.newUser.age.length)], data.newUser.hobby[random(data.newUser.hobby.length)]];
        let randomUser;

        cy.getFriends(idUser).then(res => {
            randomUser = random(res.length);
            cy.get('.list-name').click();
            cy.get('.list-name li').eq(randomUser).click({force: true});
            cy.get(field[0]).clear().type(dataArr[0]).should('have.value', dataArr[0]);
            cy.get(field[1]).clear().type(dataArr[1]).should('have.value', dataArr[1]);
            cy.get(field[2]).clear().type(dataArr[2]).should('have.value', dataArr[2]);
            cy.contains('button', 'Edit a friend').click();
            cy.checkAlert('Friend was updated');
            cy.get(field[0]).should('not.have.value');
            cy.get(field[1]).should('not.have.value');
            cy.get(field[2]).should('not.have.value');
        });
        cy.getFriends(idUser).then(res => {
            expect(res[randomUser - 1].name).equal(dataArr[0]);
            expect(res[randomUser - 1].age).equal(dataArr[1]);
            expect(res[randomUser - 1].hobby).equal(dataArr[2]);
        });
    });

    // Negative scenarios
    it('[Negative] User tries to edit a friend when friend is not chosen', () => {
        cy.get(field[0]).type(data.newUser.name[0]);
        cy.get(field[1]).type(data.newUser.age[0]);
        cy.get(field[2]).type(data.newUser.hobby[0]);
        cy.contains('button', 'Edit a friend').click();
        cy.checkAlert('Please choose a friend');
    });

    it('[Negative] User tries to edit a friend with empty fields', () => {
        cy.get('.list-name').click();
        cy.get('.list-name li').eq(1).click({force: true});
        cy.emptyField(field[0], 'Edit a friend');
        cy.get(field[0]).type('John');
        cy.emptyField(field[1], 'Edit a friend');
        cy.get(field[1]).type(25);
        cy.emptyField(field[2], 'Edit a friend');        
    });

    it('[Negative] User tries to edit a friend with incorrect length of fields', () => {
        const value = [data.incorrectUserData.nameLength[0], data.incorrectUserData.ageLength[0], data.incorrectUserData.hobbyLength[0]];
        cy.getFriends(idUser).then(res => {
            const userData = [res[0].name, res[0].age, res[0].hobby];
            cy.get('.list-name').click();
            cy.get('.list-name li').eq(1).click({force: true});
            cy.incorrectLengthText(field[0], value[0], 'Edit a friend');
            cy.get(field[0]).clear().type('John');
            cy.incorrectLengthAge(field[1], value[1], 'Edit a friend');
            cy.get(field[1]).clear().type(25);
            cy.incorrectLengthText(field[2], value[2], 'Edit a friend');
            checkFriend(userData);
        });
    });

    it('[Negative] User tries to edit a friend with incorrect data of name/hobby', () => {
        const value = [data.incorrectUserData.nameFormat[random(data.incorrectUserData.nameFormat.length-1)], data.incorrectUserData.hobbyFormat[random(data.incorrectUserData.hobbyFormat.length-1)]];

        cy.getFriends(idUser).then(res => {
            const userData = [res[0].name, res[0].age, res[0].hobby];
            cy.get('.list-name').click();
            cy.get('.list-name li').eq(1).click({force: true});
            cy.incorrectDataText(field[0], value[0], 'Edit a friend');
            cy.get(field[0]).clear().type('John');
            cy.incorrectDataText(field[2], value[1], 'Edit a friend');
            checkFriend(userData);
        });
    });

    it('[Negative] User tries to edit a friend with incorrect data of age', () => {
        const value = data.incorrectUserData.ageFormat[random(data.incorrectUserData.ageFormat.length-1)];

        cy.getFriends(idUser).then(res => {
            const userData = [res[0].name, res[0].age, res[0].hobby];
            cy.get('.list-name').click();
            cy.get('.list-name li').eq(1).click({force: true});
            cy.incorrectDataAge(field[1], value, 'Edit a friend');
            checkFriend(userData);
        });
    });

    it(`User views empty state if friends haven't been added`, () => {
        cy.emptyStateAlt('.change_friend', '.name-friend');
    });

    function checkFriend(oldVal) {
        cy.getFriends(idUser).then(res => {
            expect(oldVal[0]).equal(res[0].name);
            expect(oldVal[1]).equal(res[0].age);
            expect(oldVal[2]).equal(res[0].hobby);
        });
    }
});