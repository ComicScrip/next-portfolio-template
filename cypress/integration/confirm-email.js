describe('/confirm-email', () => {
  beforeEach(() => {
    cy.task('cleanDb');
    cy.task('createUser', {
      email: 'john.doe@gmail.com',
      password: 'zijfaizfjoaijaf',
      emailVerificationCode: 'theCode',
    });
  });

  it('sets emailVerificationCode user field to null and when visited with a valid code', () => {
    cy.visit('/confirm-email?emailVerificationCode=theCode');
    cy.contains("Merci d'avoir confirmé votre e-mail.");
  });

  it('shows a message when code is invalid', () => {
    cy.visit('/confirm-email?emailVerificationCode=notTheCode');
    cy.contains('Code de vérification invalide');
  });
});
