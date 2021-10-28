///<reference types="Cypress" />

describe('New guest user signs up on the first step', () => {
    before(() => cy.fixture('user_data').then(data => globalThis.data = data));
    beforeEach(() => cy.visit('/signup'));

    it('Guest user navigates to Login page from Signup page', () => {
        cy.contains('.header-link', 'Log in').click();
        cy.url().should('include', '/login');
    });
    
    it('Guest user fills the first step successfully', () => {
        cy.fillMainData('#name', '#age', '#hobby');
        cy.contains('button', 'Next').click();
        cy.get('.first-step').should('have.css', 'display', 'none');
        cy.get('.second-step').should('not.have.css', 'display', 'none');
    });

    it('Guest user choose a new avatar successfully', () => {
        let random = Math.floor(Math.random() * 4);
        cy.get('.avatar-wrap').click();
        cy.get('.overlay-avatar').should('be.visible');
        cy.get('.avatar-img-wrap img').eq(random).click().should('have.class', 'avatar-img_chosen');
        cy.get('.avatar-img-wrap img').eq(random).invoke('attr', 'src').then(path => {
            cy.contains('button', 'Upload').click({force: true});
            cy.get('.overlay-avatar').should('not.exist');
            cy.get('.avatar-wrap img').should('have.attr', 'src', path);
        });
    });

    it('Guest user cancels choosing a new avatar', () => {
        cy.get('.avatar-wrap img').invoke('attr', 'src').then(path => {
            cy.get('.avatar-wrap').click();
            cy.get('.avatar-img-wrap img').eq(1).click();
            cy.contains('button', 'Cancel').click({force: true});
            cy.get('.overlay-avatar').should('not.exist');
            cy.get('.avatar-wrap img').should('have.attr', 'src', path);
        });
    });

    // Negative scenarios
    it('[Negative] Guest user tries to follow to the 2nd step with empty fields', () => {
        cy.emptyField('#name', 'Next');
        checkFirstStep();
        cy.emptyField('#age', 'Next');
        checkFirstStep();
        cy.emptyField('#hobby', 'Next');
        checkFirstStep();

        function checkFirstStep() {
            cy.get('.first-step').should('not.have.css', 'display', 'none');
        }
    });

    it('[Negative] Guest user tries to follow to the 2nd step with incorrect length of fields', () => {
        cy.fillMainData('#name', '#age', '#hobby');
        cy.incorrectLengthText('#name', data.IncorrectUserData.nameLength[0], 'Next');
        checkFirstStep();
        cy.fillMainData('#name', '#age', '#hobby');
        cy.incorrectLengthAge('#age', data.IncorrectUserData.ageLength[0], 'Next');
        checkFirstStep();
        cy.fillMainData('#name', '#age', '#hobby');
        cy.incorrectLengthText('#hobby', data.IncorrectUserData.hobbyLength[0], 'Next');
        checkFirstStep();

        function checkFirstStep() {
            cy.get('.first-step').should('not.have.css', 'display', 'none');
            // Postcondition
            cy.get('.first-step input').each(field => cy.wrap(field).clear());
        }
    });

    it('[Negative] Guest user tries to follow to the 2nd step with incorrect data of name/hobby', () => {
        let random = length => Math.floor(Math.random() * length);
        cy.fillMainData('#name', '#age', '#hobby');
        cy.incorrectDataText('#name', data.IncorrectUserData.nameFormat[random(4)], 'Next');
        checkFirstStep();
        cy.fillMainData('#name', '#age', '#hobby');
        cy.incorrectDataText('#hobby', data.IncorrectUserData.hobbyFormat[random(3)], 'Next');
        checkFirstStep();

        function checkFirstStep() {
            cy.get('.first-step').should('not.have.css', 'display', 'none');
            // Postcondition
            cy.get('.first-step input').each(field => cy.wrap(field).clear());
        }
    });

    it('[Negative] Guest user tries to follow to the 2nd step with incorrect data of age', () => {
        let random = () => Math.floor(Math.random() * data.IncorrectUserData.ageFormat.length);
        cy.fillMainData('#name', '#age', '#hobby');
        cy.incorrectDataAge('#age', data.IncorrectUserData.ageFormat[random()], 'Next');
        cy.get('.first-step').should('not.have.css', 'display', 'none');
    });
});