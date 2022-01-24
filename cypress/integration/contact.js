describe('/contact', () => {
  beforeEach(() => {
    cy.visitInLanguage('/contact', 'fr');
  });

  it('does not send the form if there are validation errors', () => {
    cy.get('input:invalid').should('have.length', 1);
    cy.get('textarea:invalid').should('have.length', 1);
    cy.get('#email').type('john.doe@gmail.com');
    cy.get('#message').type('my message');
    cy.get('input:invalid').should('have.length', 0);
    cy.get('textarea:invalid').should('have.length', 0);
    cy.get('form').submit();
    cy.contains('Merci de complétrer la vérification hCaptcha');
  });

  it('sends a mail when provided correct input', () => {
    cy.get('#email').type('john.doe@gmail.com');
    cy.get('#message').type('my message');
    cy.get('#contact-captcha > iframe')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .as('captcha')
      .contains('Cet hCaptcha est uniquement destiné aux tests.')
      .click();
    cy.get('@captcha').contains('Vous êtes vérifié');
    cy.get('form').submit();
    cy.contains('Merci, je vous recontacterai au plus vite').should(
      'be.visible'
    );
    cy.task('getLastEmail', Cypress.env('CONTACT_FORM_RECIPIENT')).then(
      (email) => {
        expect(email).not.to.be.null;
        expect(email.body).to.contain('john.doe@gmail.com');
      }
    );
  });
});
