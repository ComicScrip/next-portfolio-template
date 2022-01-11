describe('homepage', () => {
  it('shows some content', () => {
    cy.visit('/');
    cy.contains('Salut');
    cy.get('[data-cy=bio]').should('be.visible');
  });
});
