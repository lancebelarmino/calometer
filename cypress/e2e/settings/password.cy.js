/// <reference types="cypress" />

describe('Password Settings', () => {
  beforeEach(() => {
    cy.login();
  });

  it('shows incorrect current password error', () => {
    cy.visit('/settings');
    cy.findByLabelText('Current Password').type('wrongpassword');
    cy.findByRole('button', { name: 'Save' }).click();
    cy.findByText('Wrong password', { exact: false });
  });

  it('shows incorrect confirm password error', () => {
    cy.visit('/settings');
    cy.findByLabelText('Current Password').type('123123123q');
    cy.findByLabelText('New Password').type('123123123q');
    cy.findByLabelText('Confirm Password').type('wrongpassword');
    cy.findByRole('button', { name: 'Save' }).click();
    cy.findByText('Password is not the same', { exact: false });
  });

  it('updates password', () => {
    cy.visit('/settings');
    cy.findByLabelText('Current Password').type('123123123q');
    cy.findByLabelText('New Password').type('123123123q');
    cy.findByLabelText('Confirm Password').type('123123123q');
    cy.findByRole('button', { name: 'Save' }).click();
    cy.findByText('Password updated', { exact: false });
  });
});
