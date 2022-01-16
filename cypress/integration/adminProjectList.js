describe('/admin/projects', () => {
  let p1, p2;
  before(() => {
    cy.task('cleanDb');
  });
  beforeEach(() => {
    cy.task('deleteAllProjects');
    cy.task('createSampleProject', 'P1').then((p) => (p1 = p));
    cy.task('createSampleProject', 'P2').then((p) => (p2 = p));
    cy.signup({ email: 'admin@website.com', role: 'admin' });
    cy.login({ email: 'admin@website.com', role: 'admin' });
    cy.visit('/admin/projects');
  });
  it('shows the projects in db', () => {
    cy.contains('P1');
    cy.contains('P2');
  });
  it('can navigate to project details', () => {
    cy.get(`[data-cy=see-btn-${p1.id}]`).click();
    cy.url().should('include', `projects/${p1.id}`);
    cy.visit('/admin/projects');
    cy.get(`[data-cy=see-btn-${p2.id}]`).click();
    cy.url().should('include', `projects/${p2.id}`);
  });
  it('can navigate to project update page', () => {
    cy.get(`[data-cy=edit-btn-${p1.id}]`).click();
    cy.url().should('include', `/admin/projects/edit/${p1.id}`);
    cy.visit('/admin/projects');
    cy.get(`[data-cy=edit-btn-${p2.id}]`).click();
    cy.url().should('include', `/admin/projects/edit/${p2.id}`);
  });
  it('can delete a project', () => {
    cy.get(`[data-cy=delete-btn-${p1.id}]`).click();
    cy.contains('P1').should('not.exist');
  });
  it('navigate to project cration page', () => {
    cy.contains('New Project').click('');
    cy.url().should('include', `/admin/projects/edit/new`);
  });
});
