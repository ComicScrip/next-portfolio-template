describe('Homepage', () => {
  it('loads correctly', () => {
    cy.visit('/');
    cy.contains('Saluttt');
  });
});
