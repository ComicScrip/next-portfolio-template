describe("/admin/users", () => {
  beforeEach(() => {
    cy.task("deleteAllUsers");
    cy.setupCurrentUser({
      role: "admin",
      email: "admin@website.com",
      name: "admin",
    });
    cy.task("createSampleUser", {
      email: "john.doe@gmail.com",
      name: "john doe",
    });
    cy.task("createSampleUser", {
      email: "jane.doe@gmail.com",
      name: "jane doe",
    });
    cy.task("createSampleUser", {
      email: "lopper.dave@gmail.com",
      name: "Dave Lopper",
      active: false,
    });
    cy.visit("/admin/users");
  });
  it("shows the users in db", () => {
    cy.contains("john.doe@gmail.com");
    cy.contains("john doe");
    cy.contains("jane.doe@gmail.com");
    cy.contains("jane doe");
    cy.contains("admin@website.com");
    cy.contains("admin");
  });

  it("should be sorted by creation date desc by default", () => {
    cy.get('[data-cy="users-table-row-0"]').should("contain", "Dave Lopper");
    cy.get('[data-cy="users-table-row-1"]').should("contain", "jane doe");
    cy.get('[data-cy="users-table-row-2"]').should("contain", "john doe");
    cy.get('[data-cy="users-table-row-3"]').should("contain", "admin");
  });

  it("can paginate the users in db", () => {
    cy.get('[data-cy="perPageSelect"]').select("2");
    cy.url().should("contain", "perPage=2");
    cy.get("tbody tr").should("have.length", 2);
    cy.get('[data-cy="currentPageSelect"]').select("2");
    cy.url().should("contain", "pageNumber=2");
    cy.get("tbody tr").should("have.length", 2);
    cy.get('[data-cy="perPageSelect"]').select("5");
    cy.url().should("contain", "pageNumber=1");
    cy.url().should("contain", "perPage=5");
    cy.get("tbody tr").should("have.length", 4);
    cy.get('[data-cy="currentPageSelect"] option').should("have.length", 1);
  });

  it("can search by email or name", () => {
    cy.get("tbody tr").should("have.length", 4);
    cy.get('[data-cy="nameOrEmailContains"]').type("doe", { delay: 50 });
    cy.get("tbody tr").should("have.length", 2);
    cy.contains("admin@website.com").should("not.exist");
    cy.get('[data-cy="nameOrEmailContains"]').type("{selectAll}john", {
      delay: 50,
    });
    cy.get("tbody tr").should("have.length", 1);
    cy.get('[data-cy="nameOrEmailContains"]').type("{selectAll}JOHN", {
      delay: 50,
    });
    cy.get("tbody tr").should("have.length", 1);
    cy.get('[data-cy="nameOrEmailContains"]').type("{selectAll}website.com", {
      delay: 50,
    });
    cy.get("tbody tr").should("have.length", 1);
    cy.get('[data-cy="nameOrEmailContains"]').type("{selectAll}gmail.com", {
      delay: 50,
    });
    cy.get("tbody tr").should("have.length", 3);
  });

  it("can filter by active state", () => {
    cy.get("tbody tr").should("have.length", 4);
    cy.get('[data-cy="activeSelect"]').select("Active");
    cy.get("tbody tr").should("have.length", 3);
    cy.get('[data-cy="activeSelect"]').select("Not active");
    cy.get("tbody tr").should("have.length", 1);
    cy.get('[data-cy="activeSelect"]').select("All");
    cy.get("tbody tr").should("have.length", 4);
  });

  it("can sort by name", () => {
    cy.get('[data-cy="sortByNameAscBtn"]').click();

    cy.get('[data-cy="users-table-row-0"]').should("contain", "admin");
    cy.get('[data-cy="users-table-row-1"]').should("contain", "Dave Lopper");
    cy.get('[data-cy="users-table-row-2"]').should("contain", "jane doe");
    cy.get('[data-cy="users-table-row-3"]').should("contain", "john doe");

    cy.get('[data-cy="sortByNameAscBtn"]').click();

    cy.get('[data-cy="users-table-row-0"]').should("contain", "Dave Lopper");
    cy.get('[data-cy="users-table-row-1"]').should("contain", "jane doe");
    cy.get('[data-cy="users-table-row-2"]').should("contain", "john doe");
    cy.get('[data-cy="users-table-row-3"]').should("contain", "admin");

    cy.get('[data-cy="sortByNameDescBtn"]').click();

    cy.get('[data-cy="users-table-row-0"]').should("contain", "john doe");
    cy.get('[data-cy="users-table-row-1"]').should("contain", "jane doe");
    cy.get('[data-cy="users-table-row-2"]').should("contain", "Dave Lopper");
    cy.get('[data-cy="users-table-row-3"]').should("contain", "admin");

    cy.get('[data-cy="sortByNameDescBtn"]').click();

    cy.get('[data-cy="users-table-row-0"]').should("contain", "Dave Lopper");
    cy.get('[data-cy="users-table-row-1"]').should("contain", "jane doe");
    cy.get('[data-cy="users-table-row-2"]').should("contain", "john doe");
    cy.get('[data-cy="users-table-row-3"]').should("contain", "admin");
  });

  it("can sort by email", () => {
    cy.get('[data-cy="sortByEmailAscBtn"]').click();

    cy.get('[data-cy="users-table-row-0"]').should("contain", "admin");
    cy.get('[data-cy="users-table-row-1"]').should("contain", "jane doe");
    cy.get('[data-cy="users-table-row-2"]').should("contain", "john doe");
    cy.get('[data-cy="users-table-row-3"]').should("contain", "Dave Lopper");

    cy.get('[data-cy="sortByEmailAscBtn"]').click();

    cy.get('[data-cy="users-table-row-0"]').should("contain", "Dave Lopper");
    cy.get('[data-cy="users-table-row-1"]').should("contain", "jane doe");
    cy.get('[data-cy="users-table-row-2"]').should("contain", "john doe");
    cy.get('[data-cy="users-table-row-3"]').should("contain", "admin");

    cy.get('[data-cy="sortByEmailDescBtn"]').click();

    cy.get('[data-cy="users-table-row-0"]').should("contain", "Dave Lopper");
    cy.get('[data-cy="users-table-row-1"]').should("contain", "john doe");
    cy.get('[data-cy="users-table-row-2"]').should("contain", "jane doe");
    cy.get('[data-cy="users-table-row-3"]').should("contain", "admin");

    cy.get('[data-cy="sortByEmailDescBtn"]').click();

    cy.get('[data-cy="users-table-row-0"]').should("contain", "Dave Lopper");
    cy.get('[data-cy="users-table-row-1"]').should("contain", "jane doe");
    cy.get('[data-cy="users-table-row-2"]').should("contain", "john doe");
    cy.get('[data-cy="users-table-row-3"]').should("contain", "admin");
  });
});
