///<reference types="Cypress"/>

describe('User adds a friend in Add friends tab', () => {
    const field = ['.add_friend label:nth-child(1) input', '.add_friend label:nth-child(2) input', '.add_friend label:nth-child(3) input'];
    let idUser;
    let random = length => Math.floor(Math.random() * length);
    before(() => {
        cy.fixture('user_data').then(data => {
            globalThis.data = data;
            idUser = data.registeredUser[0].id;
            cy.getToken(data.registeredUser[0].email, data.registeredUser[0].password).then(token => {
                cy.setCookie('token', token);
            });
        });
    });
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('token');
        cy.visit('/');
        cy.contains('.aside-list li', 'Add friends').click();
    });

    it('User navigates to Add friends tab from another tab in Main menu', () => {
        cy.switchTab(1, 2, '.add_friend');
    });

    it('User adds a friend successfully', () => {
        const dataArr = [data.newUser.name[random(data.newUser.name.length)], data.newUser.age[random(data.newUser.age.length)], data.newUser.hobby[random(data.newUser.hobby.length)]];
        
        cy.get('.add_friend input').eq(0).type(dataArr[0]).should('have.value', dataArr[0]);
        cy.get('.add_friend input').eq(1).type(dataArr[1]).should('have.value', dataArr[1]);
        cy.get('.add_friend input').eq(2).type(dataArr[2]).should('have.value', dataArr[2]);
        cy.contains('button', 'Add a friend').click();
        cy.checkAlert('Friend was added');
        cy.getFriends(idUser).then(res => {
            expect(dataArr[0]).equal(res[res.length - 1].name);
            expect(dataArr[1]).equal(res[res.length - 1].age);
            expect(dataArr[2]).equal(res[res.length - 1].hobby);
        });
    });

    // Negative scenarios
    it('[Negative] User tries to add a friend with empty fields', () => {
        fillFields();
        cy.emptyField(field[0], 'Add a friend');
        clearFields();
        fillFields();
        cy.emptyField(field[1], 'Add a friend');
        clearFields();
        fillFields();
        cy.emptyField(field[2], 'Add a friend');
    });

    it('[Negative] User tries to add a friend with incorrect length of fields', () => {
        const value = [data.incorrectUserData.nameLength[0], data.incorrectUserData.ageLength[0], data.incorrectUserData.hobbyLength[0]];

        fillFields();
        cy.incorrectLengthText(field[0], value[0], 'Add a friend');
        clearFields();
        fillFields();
        cy.incorrectLengthAge(field[1], value[1], 'Add a friend');
        clearFields();
        fillFields();
        cy.incorrectLengthText(field[2], value[2], 'Add a friend');
        cy.getFriends(idUser).then(res => {
            expect(value[0]).not.equal(res[res.length - 1].name);
            expect(value[1]).not.equal(res[res.length - 1].age);
            expect(value[2]).not.equal(res[res.length - 1].hobby);
        });
    });

    it('[Negative] User tries to add a friend with incorrect data of name/hobby', () => {
        const value = [data.incorrectUserData.nameFormat[random(data.incorrectUserData.nameFormat.length-1)], data.incorrectUserData.hobbyFormat[random(data.incorrectUserData.hobbyFormat.length-1)]];

        fillFields();
        cy.incorrectDataText(field[0], value[0], 'Add a friend');
        clearFields();
        fillFields();
        cy.incorrectDataText(field[2], value[1], 'Add a friend');
        cy.getFriends(idUser).then(res => {
            expect(value[0]).not.equal(res[res.length - 1].name);
            expect(value[1]).not.equal(res[res.length - 1].hobby);
        });
    });

    it('[Negative] User tries to add a friend with incorrect data of age', () => {
        const value = data.incorrectUserData.ageFormat[random(data.incorrectUserData.ageFormat.length-1)];
        fillFields();
        cy.incorrectDataAge(field[1], value, 'Add a friend');
        cy.getFriends(idUser).then(res => {
            expect(value).not.equal(res[res.length - 1].age);
        });
    });

    function fillFields() {
        cy.get('.add_friend input').eq(0).type(data.newUser.name[0]);
        cy.get('.add_friend input').eq(1).type(data.newUser.age[0]);
        cy.get('.add_friend input').eq(2).type(data.newUser.hobby[0]);
    }
    function clearFields() {
        cy.get('.add_friend input').each(el => cy.wrap(el).clear());
    }
});