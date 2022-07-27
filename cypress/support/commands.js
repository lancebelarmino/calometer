import '@testing-library/cypress/add-commands';

Cypress.Commands.add(
  'login',
  ({ email = 'test@xmail.com', password = '123123123q' } = {}, { cacheSession = true } = {}) => {
    const login = () => {
      cy.intercept('POST', 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=*').as('loginUser');

      cy.visit('/login');

      cy.findByLabelText('Email').type(email);
      cy.findByLabelText('Password').type(password);
      cy.findByRole('button', { name: 'Sign In' }).click();

      cy.wait('@loginUser').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });

      window.localStorage.setItem('isOnboarded', 'true');
    };

    if (cacheSession) {
      cy.session(email, login);
    } else {
      login();
    }
  }
);
