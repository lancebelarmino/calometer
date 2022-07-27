/// <reference types="cypress" />

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  context('Login Failure', () => {
    it('displays invalid username error', () => {
      cy.findByLabelText('Email').type('wrong@email.com');
      cy.findByLabelText('Password').type('123123123q');
      cy.findByRole('button', { name: 'Sign In' }).click();
      cy.findByText('Invalid username or password');
    });

    it('displays invalid password error', () => {
      cy.findByLabelText('Email').type('test@xmail.com');
      cy.findByLabelText('Password').type('password');
      cy.findByRole('button', { name: 'Sign In' }).click();
      cy.findByText('Invalid username or password');
    });
  });

  context('Not Onboarded User Login Success', () => {
    it('logs in user and navigate to onboarding page', () => {
      cy.session(['Onboarded', 'User'], () => {
        cy.visit('/login');
        cy.findByLabelText('Email').type('notonboarded@xmail.com');
        cy.findByLabelText('Password').type('123123123q');
        cy.findByRole('button', { name: 'Sign In' }).click();
        cy.findByText('Welcome to Calometer');
      });
    });
  });

  context('Onboarded User Login Success', () => {
    it('logs in user and navigate to dashboard page', () => {
      cy.session(['Onboarded', 'User'], () => {
        cy.visit('/login');
        cy.findByLabelText('Email').type('test2@xmail.com');
        cy.findByLabelText('Password').type('123123123q');
        cy.findByRole('button', { name: 'Sign In' }).click();
        cy.findByText('Work hard in silence.');
      });
    });
  });
});
