/// <reference types="cypress" />

describe('Statistics', () => {
  beforeEach(() => {
    cy.login();
  });

  it('toggles and displays statistics', () => {
    cy.visit('/tracker');
    cy.findByRole('button', { name: 'View Statistics' }).click();
    cy.findByText('Average Calories');
  });
});
