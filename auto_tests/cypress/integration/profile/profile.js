///<reference types="Cypress"/>

describe('User changes data on Profile page', () => {
    let profile;
    before(() => {
        cy.fixture('user_data').then(data => {
            globalThis.data = data;
            cy.getToken(data.registeredUser[0].email, data.registeredUser[0].password).then(token => {
                cy.setCookie('token',  token);
                cy.getProfile(data.registeredUser[0].id).then(data => profile = data[0]);
                cy.wait(1000);
            });
        });
    });
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('token');
        cy.visit('/profile');
    });

    it('User navigates to Profile page from Main page', () => {
        cy.visit('/');
        cy.get('.header-profile a[title="Profile"]').click({force: true});
        cy.url().should('include', '/profile');
    });

    it('User views profile data', () => {
        cy.get('.user-table td').eq(0).should('have.text', profile.name);
        cy.get('.user-table td').eq(1).should('have.text', profile.age);
        cy.get('.user-table td').eq(2).should('have.text', profile.hobby);
        cy.get('.profile-wrap img').invoke('attr', 'src').should('include', profile.avatar); 
    });

    it('User changes profile data successfully', () => {
        const newData = getUser();
        cy.contains('button', 'Update profile').click();
        cy.get('.overlay-profile').should('be.visible');
        cy.get('.modal-profile input').eq(0).type(newData.name).should('have.value', newData.name);
        cy.get('.modal-profile input').eq(1).type(newData.age).should('have.value', newData.age);
        cy.get('.modal-profile input').eq(2).type(newData.hobby).should('have.value', newData.hobby);
        cy.contains('.modal-profile button', 'Confirm').click({force: true});
        cy.checkAlert('Profile has been updated');
        checkNewData();
        cy.get('.overlay-profile').should('not.be.visible');
        cy.reload();
        checkNewData();

        function checkNewData() {
            cy.get('.user-table td').eq(0).should('have.text', newData.name);
            cy.get('.user-table td').eq(1).should('have.text', newData.age);
            cy.get('.user-table td').eq(2).should('have.text', newData.hobby);
        }

        // Postcondition
        backDefaultData();
    });

    it('User cancels changing profile data', () => {
        getUser();
        cy.contains('button', 'Update profile').click();
        fillData(getUser().name, getUser().age, getUser().hobby);
        cy.contains('button', 'Cancel').click();
        checkFillData(profile.name, profile.age, profile.hobby);
    });

    it('User changes avatar successfully', () => {
        const random = Math.floor(Math.random()*3);
        cy.get('.profile-wrap img').click({force: true});
        cy.get('.overlay-avatar').should('be.visible');
        cy.get('.overlay-avatar .avatar-img_chosen').invoke('attr', 'src').should('include', profile.avatar);
        cy.get('.overlay-avatar img:not([class="avatar-img_chosen"])').eq(random).then(img => {
            let src = img[0].currentSrc.split('/');
            src = src[src.length - 1];
            cy.wrap(img).click({force: true});
            cy.get('.overlay-avatar .avatar-img_chosen').invoke('attr', 'src').should('include', src);
            cy.contains('.profile-btn-wrap button', 'Upload').click({force: true});

            // Couldn't check alert and make the change avatar via modal because of Cypress limitation (complete it on BE)
            
            changeAvatar(1, src);
            cy.get('.overlay-avatar').should('not.exist');
            cy.reload();
            cy.get('.profile-wrap img').invoke('attr', 'src').should('include', src);

            // Postcondition
            changeAvatar(1, profile.avatar);
        });
    });

    it('User cancels changing avatar', () => {
        cy.get('.profile-wrap img').click({force: true});
        cy.get('.overlay-avatar img').eq(2).click({force: true});
        cy.contains('.overlay-avatar button', 'Cancel').click({force: true});
        cy.get('.overlay-avatar').should('not.exist');
        cy.get('.profile-wrap img').invoke('attr', 'src').should('include', profile.avatar);
    });

    // Negative scenarios
    it('[Negative] User tries to change data with empty fields', () => {
        const field = ['.overlay-profile tr:nth-child(1) input', '.overlay-profile tr:nth-child(2) input', '.overlay-profile tr:nth-child(3) input'];

        cy.contains('button', 'Update profile').click();
        fillData(data.newUser.name[0], data.newUser.age[0], data.newUser.hobby[0]);
        cy.emptyField(field[0], 'Confirm');
        checkOldData();
        fillData(data.newUser.name[0], data.newUser.age[0], data.newUser.hobby[0]);
        cy.emptyField(field[1], 'Confirm');
        checkOldData();
        fillData(data.newUser.name[0], data.newUser.age[0], data.newUser.hobby[0]);
        cy.emptyField(field[2], 'Confirm');
        checkOldData();
    });

    it('[Negative] User tries to change profile with incorrect length of fields', () => {
        const field = ['.overlay-profile tr:nth-child(1) input', '.overlay-profile tr:nth-child(2) input', '.overlay-profile tr:nth-child(3) input'];

        cy.contains('button', 'Update profile').click();
        fillData(data.newUser.name[0], data.newUser.age[0], data.newUser.hobby[0]);
        cy.incorrectLengthText(field[0], data.IncorrectUserData.nameLength[0], 'Confirm');
        checkOldData();
        fillData(data.newUser.name[0], data.newUser.age[0], data.newUser.hobby[0]);
        cy.incorrectLengthAge(field[1], data.IncorrectUserData.ageLength[0], 'Confirm');
        checkOldData();
        fillData(data.newUser.name[0], data.newUser.age[0], data.newUser.hobby[0]);
        cy.incorrectLengthText(field[2], data.IncorrectUserData.hobbyLength[0], 'Confirm');
        checkOldData();
    });

    it('[Negative] User tries to change profile with incorrect length of fields with incorrect data of name/hobby', () => {
        const field = ['.overlay-profile tr:nth-child(1) input', '.overlay-profile tr:nth-child(3) input'];
        let random = length => Math.floor(Math.random() * length);

        cy.contains('button', 'Update profile').click();
        fillData(data.newUser.name[0], data.newUser.age[0], data.newUser.hobby[0]);
        cy.incorrectDataText(field[0], data.IncorrectUserData.nameFormat[random(4)], 'Confirm');
        checkOldData();
        fillData(data.newUser.name[0], data.newUser.age[0], data.newUser.hobby[0]);
        cy.incorrectDataText(field[1], data.IncorrectUserData.hobbyFormat[random(3)], 'Confirm');
        checkOldData();
    });
    
    it('[Negative] User tries to change profile with incorrect length of fields with incorrect data of name/hobby', () => {
        const field = '.overlay-profile tr:nth-child(2) input';
        let random = () => Math.floor(Math.random() * data.IncorrectUserData.ageFormat.length);

        cy.contains('button', 'Update profile').click();
        fillData(data.newUser.name[0], data.newUser.age[0], data.newUser.hobby[0]);
        cy.incorrectDataAge(field, data.IncorrectUserData.ageFormat[random()], 'Confirm');
        checkOldData();
    });

    function getUser() {
        let random = length => Math.floor(Math.random() * length);
        const user = {
            name: data.newUser.name[random(data.newUser.name.length)],
            age: data.newUser.age[random(data.newUser.age.length)],
            hobby: data.newUser.hobby[random(data.newUser.hobby.length)]
        }
       return user;
    }

    function fillData(name, age, hobby) {
        cy.get('.modal-profile input').eq(0).type(name);
        cy.get('.modal-profile input').eq(1).type(age);
        cy.get('.modal-profile input').eq(2).type(hobby);
    }

    function checkFillData(name, age, hobby) {
        cy.get('.user-table td').eq(0).should('have.text', name);
        cy.get('.user-table td').eq(1).should('have.text', age);
        cy.get('.user-table td').eq(2).should('have.text', hobby);
    }

    function checkOldData() {
        checkFillData(profile.name, profile.age, profile.hobby);
        cy.get('.overlay-profile input').each(el => cy.wrap(el).clear());
    }

    function changeAvatar(id, src) {
        cy.request({
            method: 'PUT',
            url: '/change_avatar',
            headers: {
                'Content-type': 'application/json'
            },
            body: {
                user_id: id, 
                user_avatar: [src]
            }
        })
    }

    function backDefaultData() {
        cy.request({
            method: 'PUT',
            url: '/update_profile',
            headers: {
                'Content-type': 'application/json'
            },
            body: {
                user_id: data.registeredUser[0].id,
                user_name: data.registeredUser[0].name,
                user_age: data.registeredUser[0].age,
                user_hobby: data.registeredUser[0].hobby
            }
        });
    }
});