describe('/admin/projects/edit/[...id]', () => {
  describe('new project', () => {
    before(() => {
      cy.task('cleanDb');
    });

    beforeEach(() => {
      cy.task('deleteAllProjects');
      cy.signup({ email: 'admin@website.com', role: 'admin' });
      cy.login({ email: 'admin@website.com', role: 'admin' });
      cy.visit('/admin/projects/edit/new');
    });

    it('has blank fields', () => {
      cy.contains('new');
      cy.get('#title').should('have.value', '');
      cy.get('#description').should('have.value', '');
      cy.contains('Choose a file');
    });

    it('can create a project', () => {
      cy.get('#title').type('example');
      cy.get('#description').type('example description');

      const fileName = 'project-img.png';
      cy.get('.uploadcare--widget__button_type_open').click();
      cy.get(
        '.uploadcare--tab_name_file .uploadcare--tab__action-button'
      ).click();
      cy.get('input[type="file"]');

      cy.get('input[type="file"]').attachFile(fileName);
      cy.get(
        '.uploadcare--tab_name_preview > .uploadcare--footer > .uploadcare--button_primary'
      ).should('be.visible');
      cy.get(
        '.uploadcare--tab_name_preview > .uploadcare--footer > .uploadcare--button_primary'
      ).click();

      cy.get('.uploadcare--progress').should('exist');
      cy.get('.uploadcare--link')
        .should('exist')
        .should('contain.text', fileName);
      cy.get('[type="submit"]').click();
      cy.url().should('include', '/admin/projects');
      cy.contains('example');
    });
  });
});
