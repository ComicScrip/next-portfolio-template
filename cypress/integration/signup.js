describe('/signup', () => {
  beforeEach(() => {
    cy.task('cleanDb');
    cy.visit('/signup');
  });

  it('does not send the form if there are validation errors', () => {
    cy.get('input:invalid').should('have.length', 3);
    cy.get('#name').type('johndoe');
    cy.get('input:invalid').should('have.length', 2);
    cy.get('#email').type('john.doe@gmail.com');
    cy.get('input:invalid').should('have.length', 1);
    cy.get('#password').type('superpassword3000');
    cy.get('input:invalid').should('have.length', 0);
  });

  it('registers a new user if valid data is submitted', () => {
    cy.get('#name').type('johndoe');
    cy.get('#email').type('john.doe@gmail.com');
    cy.get('#password').type('superpassword3000');

    cy.get('button[type=submit]').click();
    cy.contains('Votre inscription est presque terminée').should('be.visible');

    cy.get('#name').should('have.value', '');
    cy.get('#email').should('have.value', '');
    cy.get('#password').should('have.value', '');

    cy.task('getLastEmail', 'john.doe@gmail.com').then((email) => {
      expect(email).not.to.be.null;
      cy.log(email);
      cy.wait(3000);
      /*
      const link = email.body.match(/https?:\/\/\S+/gi)[0];
      const confirmationCodeUrlInEmail = new URL(link);
      const confirmationCodeInEmail =
        confirmationCodeUrlInEmail.searchParams.get('emailVerificationCode');
      expect(confirmationCodeUrlInEmail).not.be.null;
      cy.task('findUserByEmail', 'john.doe@gmail.com').then((user) => {
        expect(user).to.not.be.null;
        expect(user.emailVerificationCode).to.equal(confirmationCodeInEmail);
      });
      */
    });
  });

  it('prints an error message if email already exists in DB', () => {
    cy.task('createUser', {
      name: 'janedoe',
      email: 'john.doe@gmail.com',
      password: 'superpassword123',
    });

    cy.get('#name').type('janedoe');
    cy.get('#email').type('john.doe@gmail.com');
    cy.get('#password').type('superpassword3001');

    cy.get('button[type=submit]').click();

    cy.contains('Email déjà pris').should('be.visible');
  });
});
