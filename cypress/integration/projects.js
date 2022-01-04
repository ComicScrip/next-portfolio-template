describe('Projects', () => {
  beforeEach(() => {
    cy.task('resetDB');
    cy.task('createSampleProject', 'P1');
    cy.task('createSampleProject', 'P2');
    cy.visit('/projects');
  });

  it('shows projects in db', () => {
    cy.contains('P1');
    cy.contains('P2');
  });

  it('can navigate to a detail page', () => {
    cy.contains('P1').click();
    cy.url().should('match', /\/projects\/\d+/);
  });
});
