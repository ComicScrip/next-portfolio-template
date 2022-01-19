describe('/admin', () => {
  describe('with admin session', () => {
    beforeEach(() => {
      cy.signup({ role: 'admin' });
      cy.login({ role: 'admin' });
    });
    it('shows dashboard when logged in with an admin account', () => {
      cy.visit('/admin');
      cy.contains('Dashboard');
    });

    it('has a button to go to the project management page', () => {
      cy.visit('/admin');
      cy.contains('See my projects').click();
      cy.contains('Manage projects').click();
    });
  });

  describe('without session', () => {
    it('shows a message asking to login in with an admin account', () => {
      cy.visit('/admin');
      cy.contains(
        'You have to log in with an admin user to access the back office'
      );
      cy.contains('Log in').click();
      cy.url().should('contain', '/login');
    });
  });

  describe('with visitor session', () => {
    beforeEach(() => {
      cy.signup({ email: 'visitor@website.com', role: 'visitor' });
      cy.login({ email: 'visitor@website.com', role: 'visitor' });
    });
    it('shows a message asking to login in with an admin account', () => {
      cy.visit('/admin');
      cy.contains(
        'You have to log in with an admin user to access the back office'
      );
      cy.contains('Log in').click();
      cy.url().should('contain', '/login');
    });
  });
});
