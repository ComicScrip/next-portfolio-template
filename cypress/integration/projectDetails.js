describe('/projects/[id]', () => {
  beforeEach(() => {
    cy.task('deleteAllProjects');
    cy.task('createSampleProject', 'P1').then((p) => {
      cy.visit(`/projects/${p.id}`);
    });
  });
  it('shows a project in db', () => {
    cy.contains('P1');
    cy.contains('P1 description');
  });
});
