describe("/login", () => {
  it("is accessible from the menu", () => {
    cy.visit("/");
    cy.contains("Se connecter").click();
    cy.url().should("include", "/login");
  });

  it("has an english translation", () => {
    cy.visitInLanguage("/login", "fr");
    cy.get('[data-cy="switch-to-en"]').click();
    cy.contains("Log In");
    cy.contains("Username");
    cy.contains("Password").click();
    cy.contains("Try those credentials");
  });

  describe("without session", () => {
    beforeEach(() => {
      cy.signup({ password: "verysecure" });
      cy.visit("/login");
    });

    it("can login with correct credentials", function () {
      cy.get('[data-cy="currentUserMenu"]').should("not.exist");
      cy.get("#username").type(this.userInDb.email);
      cy.get("#password").type("verysecure");
      cy.get("form").submit();
      cy.get('[data-cy="currentUserMenu"]').should("be.visible");
    });

    it("should redirect to previously visited page when callbackUrl is present in the url", function () {
      cy.visit("/login?callbackUrl=http://localhost:3000/projects");
      cy.get('[data-cy="currentUserMenu"]').should("not.exist");
      cy.get("#username").type(this.userInDb.email);
      cy.get("#password").type("verysecure");
      cy.get("form").submit();
      cy.get('[data-cy="currentUserMenu"]').should("be.visible");
      cy.url().should("equal", "http://localhost:3000/projects");
    });

    it("cannot login with incorrect email", () => {
      cy.get('[data-cy="currentUserMenu"]').should("not.exist");
      cy.get("#username").type("adin@website.com");
      cy.get("#password").type("verysecure");
      cy.get("form").submit();
      cy.get('[data-cy="currentUserMenu"]').should("not.exist");
      cy.contains(
        "Ces identifiants ne corresspondent à aucun utilisateur actif."
      );
    });

    it("cannot login with incorrect password", function () {
      cy.get('[data-cy="currentUserMenu"]').should("not.exist");
      cy.get("#username").type(this.userInDb.email);
      cy.get("#password").type("veryscure");
      cy.get("form").submit();
      cy.get('[data-cy="currentUserMenu"]').should("not.exist");
      cy.contains(
        "Ces identifiants ne corresspondent à aucun utilisateur actif."
      );
    });
    it("cannot login without having a confirmed email", () => {
      cy.task("deleteUserByEmail", "admin@website.com");
      cy.task("createUser", {
        email: "admin@website.com",
        role: "admin",
        password: "verysecure",
        emailVerificationCode: "test",
      });
      cy.get('[data-cy="currentUserMenu"]').should("not.exist");
      cy.get("#username").type("admin@website.com");
      cy.get("#password").type("verysecure");
      cy.get("form").submit();
      cy.get('[data-cy="currentUserMenu"]').should("not.exist");
      cy.contains(
        "Ces identifiants ne corresspondent à aucun utilisateur actif."
      );
    });
  });

  describe("with an active session", () => {
    beforeEach(() => {
      cy.setupCurrentUser({ email: "visitor@website.com" });
      cy.visit("/login");
    });
    it("shows the email of the current user", () => {
      cy.contains("connecté en tant que visitor@website.com");
    });
    it("shows a disconnect button", () => {
      cy.get("main").contains("Se déconnecter").click();
      cy.contains("Se connecter");
    });
  });
});
