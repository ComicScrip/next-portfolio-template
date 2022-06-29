describe("/projects", () => {
  beforeEach(() => {
    cy.task("deleteAllProjects");
    cy.task("createSampleProject", {
      titleFR: "P1 FR",
      titleEN: "P1 EN",
    });
    cy.task("createSampleProject", {
      titleFR: "P2 FR",
      titleEN: "P2 EN",
    });
    cy.visitInLanguage("/projects", "fr");
  });
  it("shows the projects in db", () => {
    cy.contains("P1 FR");
    cy.contains("P2 FR");
  });
  it("can navigate to project details", () => {
    cy.contains("P1").click();
    cy.url().should("match", /\/projects\/\d+/);
  });

  it("has an english translation", () => {
    cy.get('[data-cy="switch-to-en"]').click();
    cy.contains("Achievements");
    cy.contains("P1 EN");
    cy.contains("P2 EN");
  });
});
