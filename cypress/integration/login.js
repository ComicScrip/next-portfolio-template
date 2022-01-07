describe('/login', () => {
  it('shows some content', () => {
    cy.visit('/login');
    cy.get('#username').type('admin@website.com');
    cy.get('#password').type('verysecure');
    cy.get('form').submit();
    cy.contains('connecté');
  });
});
