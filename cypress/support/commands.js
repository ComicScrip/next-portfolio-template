// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add(
  'signup',
  ({
    username = 'visitor@website.com',
    role = 'visitor',
    password = 'verysecure',
  } = {}) => {
    cy.dataSession({
      name: 'userInDb',
      setup: () => {
        cy.task('deleteUserByEmail', username);
        cy.task('createUser', {
          email: username,
          password,
          role,
        }).then((user) => {
          return Promise.resolve(user);
        });
      },
      validate: (saved) => {
        return cy.task('findUserByEmail', saved.email).then((user) => {
          if (user?.email === username && user?.role === role)
            return Promise.resolve(!!user);
          else return Promise.resolve(false);
        });
      },
    });
  }
);

Cypress.Commands.add(
  'login',
  ({ username = 'visitor@website.com', role = 'visitor' } = {}) => {
    cy.dataSession({
      name: 'loggedInUser',
      setup: () => {
        cy.visit('/login');
        cy.get('#username').type(username);
        cy.get('#password').type('verysecure');
        cy.get('form').submit();
        cy.get('[data-cy="currentUserMenu"]').should('be.visible');
        cy.getCookie('next-auth.session-token')
          .should('exist')
          .then((cookie) => {
            return Promise.resolve({
              cookie,
              username,
              role,
            });
          });
      },
      validate: (saved) => {
        cy.log('in validate', saved);
        return cy
          .request({
            url: '/api/profile',
            failOnStatusCode: false,
            headers: {
              Cookie: `next-auth.session-token=${saved.cookie.value}`,
            },
          })
          .then(({ body: user }) => {
            return Promise.resolve(
              user.email === saved.username && user.role === saved.role
            );
          });
      },
      recreate: (saved) => {
        cy.setCookie('next-auth.session-token', saved.cookie.value);
      },
      dependsOn: ['userInDb'],
    });
  }
);
