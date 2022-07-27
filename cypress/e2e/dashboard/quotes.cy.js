/// <reference types="cypress" />

describe('Quotes', () => {
  it('generates new quotes', () => {
    cy.intercept('GET', 'https://type.fit/api/quotes').as('quotes');

    cy.login(undefined, { cacheSession: false });
    cy.visit('/dashboard');

    cy.findByTestId('dashboard-shuffle').click();

    cy.wait('@quotes').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
  });
});
