Cypress.Commands.add('fillMainData', (name, age, hobby) => {
    cy.fixture('user_data').then(data => globalThis.data = data);
    const random = Math.floor(Math.random() * 5);
    cy.get(name).type(data.newUser.name[random]).should('have.value', data.newUser.name[random]);
    cy.get(age).type(data.newUser.age[random]).should('have.value', data.newUser.age[random]);
    cy.get(hobby).type(data.newUser.hobby[random]).should('have.value', data.newUser.hobby[random]);
});