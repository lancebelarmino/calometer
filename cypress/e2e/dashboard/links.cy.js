/// <reference types="cypress" />

describe('Links', () => {
  beforeEach(() => {
    cy.login();
  });

  it('redirects user to tracking page', () => {
    cy.visit('/dashboard');
    cy.findByRole('link', { name: 'Start Tracking' }).click();
    cy.findByText('Tracker');
  });

  it('redirects user to settings page', () => {
    cy.visit('/dashboard');
    cy.findByTestId('dashboard-settings').click();
    cy.findByText('Settings');
  });
});
