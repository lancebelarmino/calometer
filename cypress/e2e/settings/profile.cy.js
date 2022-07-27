import { v4 as uuidv4 } from 'uuid';

/// <reference types="cypress" />

const userId = uuidv4();

describe('Profile Settings', () => {
  it('updates username', () => {
    cy.login();
    cy.visit('/settings');
    cy.findByLabelText('First Name').clear().type(`Test-${userId}`);
    cy.findByRole('button', { name: 'Save' }).click();
    cy.visit('/dashboard');
    cy.findByText(`Welcome back , Test-${userId}`);
  });
});
