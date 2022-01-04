describe('Signup', () => {
  beforeEach(() => {
    cy.task('resetDB');
    cy.visit('/signup');
  });

  it('creates a user in db when valid info is provided', () => {
    cy.get('#name').type('johndoe');
    cy.get('#email').type('johndoe@gmail.com');
    cy.get('#password').type('supermotdepasse123{enter}');

    cy.contains('Votre inscription est presque terminée').should('be.visible');

    cy.task('findUserByEmail', 'johndoe@gmail.com').then((user) => {
      expect(user).not.be.null;
    });
  });

  it('shows an error message when the user already exists in DB', () => {
    cy.task('createUser', {
      email: 'johndoe@gmail.com',
      name: 'euizehufuiezhf',
      password: 'testefieofihezfh',
    });

    cy.get('#name').type('johndoe');
    cy.get('#email').type('johndoe@gmail.com');
    cy.get('#password').type('supermotdepasse123{enter}');

    cy.contains('Email déjà pris').should('be.visible');
  });
});
