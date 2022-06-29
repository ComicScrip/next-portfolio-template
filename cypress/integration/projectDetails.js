describe("/projects/[id]", () => {
  beforeEach(() => {
    cy.task("deleteAllProjects");
    cy.task("createSampleProject", {
      titleFR: "P1 FR",
      titleEN: "P1 EN",
      descriptionFR: "P1 description FR",
      descriptionEN: "P1 description EN",
    }).then((p) => {
      cy.visitInLanguage(`/projects/${p.id}`, "fr");
    });
  });
  it("shows a project in db", () => {
    cy.contains("P1 FR");
    cy.contains("P1 description FR");
  });
  it("has an english translation", () => {
    cy.get('[data-cy="switch-to-en"]').click();
    cy.contains("P1 EN");
    cy.contains("P1 description EN");
  });
});
