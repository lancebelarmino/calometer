/// <reference types="cypress" />

describe('Board', () => {
  beforeEach(() => {
    cy.login();
  });

  it('adds a new board', () => {
    cy.visit('/tracker');
    cy.findByText('Tracker');
    cy.findByRole('button', { name: 'New Board' }).click();
    cy.findByTestId('tracker-board');
  });

  it('adds a new item', () => {
    cy.visit('/tracker');
    cy.findByTestId('board-add').click();
    cy.findByPlaceholderText('Food Name').type('Apple');
    cy.findByPlaceholderText('Amount').type('1 slice');
    cy.findByPlaceholderText('Total Calories').type('200');
    cy.findByPlaceholderText('Time').click();
    cy.findByText('Breakfast').click();
    cy.findByRole('button', { name: 'Add' }).click();
    cy.findByText('200 cal');
  });

  it('edits board item', () => {
    cy.visit('/tracker');
    cy.findByTestId('board-item').click();
    cy.findByPlaceholderText('Total Calories').clear().type('100');
    cy.findByRole('button', { name: 'Save' }).click();
    cy.findByText('100 cal');
  });

  it('deletes board item', () => {
    cy.visit('/tracker');
    cy.findByTestId('board-item').click();
    cy.findByRole('button', { name: 'Delete' }).click();
    cy.findByTestId('board-item').should('not.exist');
  });

  it('deletes board item', () => {
    cy.visit('/tracker');
    cy.findByTestId('tracker-board').trigger('mouseover');
    cy.findByTestId('board-delete').click();
    cy.findByTestId('tracker-board').should('not.exist');
  });
});
