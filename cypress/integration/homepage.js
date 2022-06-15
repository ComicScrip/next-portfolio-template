describe("/", () => {
  it("shows some content in fr", () => {
    cy.visitInLanguage("/", "fr");
    cy.contains("Salut !");
    cy.get("[data-cy=bio]").should("be.visible");
  });
  it("has a translation in en", () => {
    cy.visitInLanguage("/", "fr");
    cy.get('[data-cy="switch-to-en"]').click();
    cy.contains("Home");
    cy.contains("Projects");
    cy.contains("Log In");
    cy.contains("Hi !");
    cy.contains("See my work");
    cy.get('[data-cy="switch-to-fr"]').should("be.visible");
  });
});
