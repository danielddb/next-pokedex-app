/// <reference types="Cypress" />

const extendedTimeout = extendedTimeout;

context('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/pokemon-species');
  });

  it('a user can see the first 20 pokemon cards by default', () => {
    cy.get('[data-testid="pokemon-card"]').as('cards');

    cy.get('@cards').should('have.length', 20);

    cy.get('@cards')
      .eq(0)
      .contains('Bulbasaur');

    cy.get('@cards')
      .eq(19)
      .contains('Raticate');
  });

  it('a user cannot click the previous button on the default page as it is disabled', () => {
    cy.get('[data-testid="resource-list-navigator-prev"]').should(
      'have.class',
      'Mui-disabled'
    );
  });

  it('a user can navigate to the next set of 20 pokemon cards and navigate back again', () => {
    cy.get('[data-testid="pokemon-card"]').as('cards');

    cy.get('[data-testid="resource-list-navigator-next"]').click();

    cy.location(extendedTimeout).should(loc => {
      expect(loc.search).to.eq('?offset=20&pageLimit=20');
      expect(loc.pathname).to.eq('/pokemon-species');
    });

    cy.get('@cards').should('have.length', 20);

    cy.get('@cards')
      .eq(0)
      .contains('Spearow');

    cy.get('@cards')
      .eq(19)
      .contains('Wigglytuff');

    cy.get('[data-testid="resource-list-navigator-prev"]').click();

    cy.location(extendedTimeout).should(loc => {
      expect(loc.search).to.eq('?offset=0&pageLimit=20');
      expect(loc.pathname).to.eq('/pokemon-species');
    });

    cy.get('@cards').should('have.length', 20);

    cy.get('@cards')
      .eq(0)
      .contains('Bulbasaur');

    cy.get('@cards')
      .eq(19)
      .contains('Raticate');
  });
});
