describe('admin dashboard', () => {
  beforeEach(() => {
    cy.viewport('iphone-6');
  });

  describe('without session', () => {
    it('should display a message asking to log in with an admin account', () => {
      cy.visit('/admin');
      cy.contains(
        'You have to log in with an admin user to access the back office'
      );
    });
  });

  describe('with a non-admin user', () => {
    it('should display a message asking to log in with an admin account', () => {
      cy.setupCurrentUser({ role: 'visitor' });
      cy.visit('/admin');
      cy.contains(
        'You have to log in with an admin user to access the back office'
      );
    });
  });

  describe('with an admin user', () => {
    beforeEach(() => {
      cy.task('deleteAllUsers');
      cy.setupCurrentUser({ role: 'admin', name: 'Admin Adminson' });
    });

    it('can access the dashboard', () => {
      cy.visit('/admin');
      cy.contains('Dashboard');
    });

    it('show the list of all users', () => {
      cy.task('deleteUserByEmail', 'test@test.com');
      cy.task('createUser', {
        email: 'test@test.com',
        name: 'testuser',
        password: 'test123',
        role: 'visitor',
        image: '',
        emailVerificationCode: '',
      });
      cy.visit('/admin');
      cy.contains('testuser');
    });
  });
});
