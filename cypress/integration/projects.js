describe('/projects', () => {
  beforeEach(() => {
    cy.task('deleteAllProjects');
    cy.task('createSampleProject', 'P1');
    cy.task('createSampleProject', 'P2');
    cy.visit('/projects');
  });
  it('shows the projects in db', () => {
    cy.contains('P1');
    cy.contains('P2');
  });
  it('can navigate to project details', () => {
    cy.contains('P1').click();
    cy.url().should('match', /\/projects\/\d+/);
  });
});
