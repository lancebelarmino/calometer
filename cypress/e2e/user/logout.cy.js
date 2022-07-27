/// <reference types="cypress" />

describe('Logout', () => {
  beforeEach(() => {
    cy.login();
  });

  context('Desktop', () => {
    before(() => {
      cy.viewport('macbook-15');
    });

    it('logouts user and shows login page', () => {
      cy.visit('/dashboard');
      cy.findByTestId('nav-logout').click();
      cy.findByText('Sign in your account');
    });
  });

  context('Mobile', () => {
    before(() => {
      cy.viewport('iphone-x');
    });

    it('logouts user and shows login page', () => {
      cy.visit('/dashboard');
      cy.findAllByTestId('nav-mobile-burger').click();
      cy.findByTestId('nav-logout').click();
      cy.findByText('Sign in your account');
    });
  });
});
