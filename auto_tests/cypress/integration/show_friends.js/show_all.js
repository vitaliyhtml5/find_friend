///<reference types="Cypress"/>

describe(`User shows friend's data on Main page`, () => {
    let idUser;
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
    });

    it('User views all filled data in the table including pagination', () => {
        cy.getFriends(idUser).then(data => {
            let dataArr = [];
            for (let i = 0; i < data.length; i++) {
               dataArr.push(data[i].name, data[i].age, data[i].hobby);
            }
            cy.get('.pagination button').its('length').then(btnLength => {
                let count = 0;
                checkPagination(0);
                function checkPagination(start = 0) {
                    cy.get('.table-data tbody tr td').each((el, index) => {
                        expect(String(dataArr[index+start])).equal(el.text());
                    });
                    if (dataArr.length > 24 && (btnLength - count) > 0 ) {
                        count++;
                        cy.get('.pagination button').eq(count).click();
                        checkPagination(count*24); 
                    }
                }         
            });  
        });  
    });

    it('User sorts order of data in the table in desc order', () => {
        cy.getSortData('sort_friend_desc', 'name', 1).then(data => {
            const dataArrName = data.map(item => item.name);
            checkSortData(dataArrName, 0); 
        });
        cy.getSortData('sort_friend_desc', 'age', 1).then(data => {
            const dataArrAge = data.map(item => item.age);
            checkSortData(dataArrAge, 1);
        });
        cy.getSortData('sort_friend_desc', 'hobby', 1).then(data => {
            const dataArrHobby = data.map(item => item.hobby);
            checkSortData(dataArrHobby, 2); 
        });     
    });

    it('User sorts order of data in the table in asc order', () => {
        cy.getSortData('sort_friend_asc', 'name', 1).then(data => {
            const dataArrName = data.map(item => item.name);
            getDescOrder(0);
            checkSortData(dataArrName, 0); 
        });
        cy.getSortData('sort_friend_asc', 'age', 1).then(data => {
            const dataArrAge = data.map(item => item.age);
            getDescOrder(1);
            checkSortData(dataArrAge, 1);
        });
        cy.getSortData('sort_friend_asc', 'hobby', 1).then(data => {
            const dataArrHobby = data.map(item => item.hobby);
            getDescOrder(2);
            checkSortData(dataArrHobby, 2); 
        });
        function getDescOrder(column) {
            cy.wait(500);
            cy.get('.table-data th span').eq(column).click({force: true, multiple: true});
        }  
    });

    it('User searches excisted data in the table', () => {
        let random = length => Math.floor(Math.random() * length);
        cy.getFriends(idUser).then(data => {
            const dataArrName = data.map(item => item.name);
            const dataArrHobby = data.map(item => item.hobby);
            searchData(dataArrName, 1);
            searchData(dataArrHobby, 3);
        });
        function searchData(dataArr, index) {
            cy.wait(500);
            const searchVal = dataArr[random(dataArr.length)];
            cy.get('.search-wrap input').type(searchVal).should('have.value', searchVal);
            cy.get(`.table-data tbody tr td:nth-child(${index})`).should('have.text', searchVal);
            cy.get('.search-wrap input').type(searchVal).clear();
        }  
        //Age wasn't checked due Cypress limitation
    });

    it('User clear filled data in the search field', () => {
        cy.get('.table-data tbody td').its('length').then(length => {
            console.log(length)
            cy.get('.search-wrap input').type(data.newUser.name[0]).should('have.value', data.newUser.name[0]);
            cy.get('.search-wrap button').click({force: true});
            cy.get('.search-wrap input').should('not.have.value');
            cy.get('.search-wrap button').should('not.be.visible');
            cy.get('.table-data tbody td').its('length').should('eq', length);
        });
    });
    it('User fills non-existent data in the search field', () => {
        cy.get('.search-wrap input').type(data.incorrectUserData.nameFormat[0]).should('have.value', data.incorrectUserData.nameFormat[0]);
        cy.wait(500);
        cy.get('.table-wrap').should('have.class', 'search-empty');
        cy.get('.table-data').should('not.be.visible');
        cy.get('.search-wrap input').clear();
        cy.wait(500);
        cy.get('.table-data').should('be.visible');
        cy.get('.table-wrap').should('not.have.class', 'search-empty');
    });

    it(`User views empty state in the table if friends haven't been added`, () => {
        cy.getToken(data.registeredUserEmpty.email, data.registeredUserEmpty.password).then(token => {
            cy.setCookie('token', token);
            cy.reload();
            cy.get('.show_all').should('have.class', 'empty-state-main');
            cy.get('.table-data').should('not.be.visible');
        });
    });

    function checkSortData(dataArr, column) {
        cy.wait(500);
        cy.get('.table-data th span').eq(column).click({force: true, multiple: true});
        cy.get(`.table-data tbody tr td:nth-child(${column+1})`).each((el, index) => {
            expect(String(dataArr[index])).equal(el.text());
        });
    }
});