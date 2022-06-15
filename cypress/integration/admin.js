describe("/admin", () => {
  describe("with admin session", () => {
    beforeEach(() => {
      cy.setupCurrentUser({ role: "admin" });
    });
    it("is accessible from the menu", () => {
      cy.visit("/");
      cy.get('[data-cy="currentUserMenu"]').click();
      cy.get('[data-cy="currentUserMenu"]').contains("Back-office").click();
      cy.url().should("include", "/admin");
    });
    it("shows dashboard when logged in with an admin account", () => {
      cy.visit("/admin");
      cy.contains("Dashboard");
    });

    it("has a button to go to the project management page", () => {
      cy.visit("/admin");
      cy.contains("See my projects").click();
      cy.contains("Manage projects").click();
    });
  });

  describe("without session", () => {
    it("shows a message asking to login in with an admin account", () => {
      cy.visit("/admin");
      cy.contains(
        "You have to log in with an admin user to access the back office"
      );
      cy.contains("Log in").click();
      cy.url().should("contain", "/login");
    });
  });

  describe("with visitor session", () => {
    beforeEach(() => {
      cy.setupCurrentUser({ role: "visitor" });
    });
    it("is not accessible from the menu for visitors", () => {
      cy.visit("/");
      cy.get('[data-cy="currentUserMenu"]').click();
      cy.get('[data-cy="currentUserMenu"]').should(
        "not.contain",
        "Back-office"
      );
    });

    it("shows a message asking to login in with an admin account", () => {
      cy.visit("/admin");
      cy.contains(
        "You have to log in with an admin user to access the back office"
      );
      cy.contains("Log in").click();
      cy.url().should("contain", "/login");
    });
  });
});
