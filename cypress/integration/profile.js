describe('/profile', () => {
  before(() => {
    cy.task('cleanDb');
  });

  describe('without session', () => {
    it('redirects to login', function () {
      cy.visit('/profile');
      cy.url().should('contain', 'login');
    });
  });

  describe('with an active session', () => {
    beforeEach(() => {
      cy.setupCurrentUser({ name: 'John doe' });
    });

    it('can access profile edition form the menu', function () {
      cy.get('[data-cy="currentUserMenu"]').click();
      cy.get('[data-cy="currentUserMenu"]').contains('Profil').click();
      cy.contains('Mon profil');
    });

    it('can update the name', function () {
      cy.get('@currentUser').then((currentUser) => {
        cy.visit('/profile');
        cy.get('#name').should('have.value', currentUser.name);
        cy.get('#name').type('{selectall}test');
        cy.get('form').submit();
        cy.contains('Votre profil a bien été enregistré');
      });
    });
  });
});
