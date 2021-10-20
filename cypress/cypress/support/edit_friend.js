Cypress.Commands.add('editFriend', (random,name,age,hobby) => {
    cy.get('.change-name-friend').click({force: true});
    cy.get('.name-choose').eq(random).click({force: true});
    cy.get('.change_friend input').eq(0).clear({force: true}).type(name);
    cy.get('.change_friend input').eq(1).clear({force: true}).type(age);
    cy.get('.change_friend input').eq(2).clear({force: true}).type(hobby);
    cy.contains('.change_friend button','Confirm').click();
});