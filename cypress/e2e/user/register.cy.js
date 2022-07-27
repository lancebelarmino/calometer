/// <reference types="cypress" />

describe('Register', () => {
  context('Form Errors', () => {
    beforeEach(() => {
      cy.visit('/register');
    });

    it('displays invalid email error', () => {
      cy.findByLabelText('Email', { exact: false }).type('wrong format').blur();
      cy.findByText('Invalid email');
    });

    it('displays weak password error', () => {
      cy.findByLabelText('Password', { exact: false }).type('1').blur();
      cy.findByText('Password is not strong enough');
    });
  });

  context('Successful Register', () => {
    it('creates a new user', () => {
      cy.intercept('POST', 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=*').as('registerUser');
      cy.visit('/register');

      cy.findByLabelText('First Name', { exact: false }).type('Register');
      cy.findByLabelText('Last Name', { exact: false }).type('Test');
      cy.findByLabelText('Email', { exact: false }).type('register@xmail.com');
      cy.findByLabelText('Password', { exact: false }).type('123123123q');
      cy.findByRole('button', { name: 'Create Account' }).click();

      cy.wait('@registerUser').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
    });

    it('deletes new user', () => {
      cy.intercept('POST', 'https://identitytoolkit.googleapis.com/v1/accounts:delete?key=*').as('deleteUser');

      cy.login({ email: 'register@xmail.com', password: '123123123q' }, { cacheSession: false });
      cy.visit('/settings');
      cy.findByRole('button', { name: 'Delete Account' }).click();
      cy.findByRole('button', { name: 'Delete' }).click();

      cy.wait('@deleteUser').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
    });
  });
});
