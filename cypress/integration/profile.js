describe('/profile', () => {
  before(() => {
    cy.task('deleteAllUsers');
  });
  describe('with an active session', () => {
    beforeEach(() => {
      cy.setupCurrentUser({ name: 'John doe' });
    });

    it('is accessible form the menu', function () {
      cy.get('[data-cy="currentUserMenu"]').click();
      cy.get('[data-cy="currentUserMenu"]').contains('Profil').click();
      cy.contains('Mon profil');
    });

    it('cannot update the email', function () {
      cy.visit('/profile');
      cy.get('input[type="email"]').should('be.disabled');
    });

    it('can update the name', function () {
      cy.get('@currentUser').then((currentUser) => {
        cy.visit('/profile');
        cy.get('#name').should('have.value', currentUser.name);
        cy.get('#name').type('{selectall}test123');
        cy.get('form').submit();
        cy.contains('Votre profil a bien été enregistré');
        cy.task('findUserByEmail', currentUser.email).then((user) => {
          expect(user.name).to.equal('test123');
        });
      });
    });

    it('can update the avatar', function () {
      cy.get('@currentUser').then(({ email }) => {
        cy.task('findUserByEmail', email).then((user) => {
          const initialAvatarUrl = user.image;
          cy.visit('/profile');
          cy.get('#name').should('have.value', user.name);
          cy.get('input[type="file"]').attachFile('zorro.jpg');
          cy.get('form').submit();
          cy.contains('Votre profil a bien été enregistré');
          cy.task('findUserByEmail', email).then((user) => {
            expect(user.image).to.not.equal(initialAvatarUrl);
          });
        });
      });
    });
  });
  describe('without session', () => {
    it('redirects to login', function () {
      cy.visit('/profile');
      cy.url().should('contain', 'login');
    });
  });
});
