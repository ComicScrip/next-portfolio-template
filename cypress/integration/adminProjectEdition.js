describe('/admin/projects/edit/[...id]', () => {
  beforeEach(() => {
    cy.setupCurrentUser({ role: 'admin' });
    cy.task('deleteAllProjects');
  });
  describe('new project', () => {
    beforeEach(() => {
      cy.visitInLanguage('/admin/projects/edit/new', 'en');
    });

    it('has blank fields', () => {
      cy.contains('new');
      cy.get('#title').should('have.value', '');
      cy.get('#description').should('have.value', '');
      cy.contains('Choose a file');
    });

    it('can create a project', () => {
      cy.get('[data-cy="project-lang-input"]').select('FR');
      cy.get('#title').type('exampleFR');
      cy.get('#description').type('example descriptionFR');
      cy.get('[data-cy="project-lang-input"]').select('EN');
      cy.get('#title').type('exampleEN');
      cy.get('#description').type('example descriptionEN');

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
      cy.url().should('match', /admin\/projects$/);
      cy.task('getAllProjects').then(([createdProject]) => {
        expect(createdProject.titleFR).to.equal('exampleFR');
        expect(createdProject.titleEN).to.equal('exampleEN');
        expect(createdProject.descriptionFR).to.equal('example descriptionFR');
        expect(createdProject.descriptionEN).to.equal('example descriptionEN');
        expect(createdProject.mainPictureUrl).not.to.equal(null);
      });
    });
  });

  describe('existing project', () => {
    let p1;
    beforeEach(() => {
      cy.task('createSampleProject').then((p) => {
        p1 = p;
        cy.visit(`/admin/projects/edit/${p1.id}`);
      });
    });

    it('fills the fields with the project information from DB', () => {
      cy.get('[data-cy="project-lang-input"]').select('FR');
      cy.get('#title').should('have.value', p1.titleFR);
      cy.get('#description').should('have.value', p1.descriptionFR);
      cy.get('[data-cy="project-lang-input"]').select('EN');
      cy.get('#title').should('have.value', p1.titleEN);
      cy.get('#description').should('have.value', p1.descriptionEN);
      cy.contains('Choose a file');
    });
    it('can update a project title and description', () => {
      cy.get('[data-cy="project-lang-input"]').select('FR');
      cy.get('#title').type('{selectall}updated title FR');
      cy.get('#description').type('{selectall}updated description FR');
      cy.get('[data-cy="project-lang-input"]').select('EN');
      cy.get('#title').type('{selectall}updated title EN');
      cy.get('#description').type('{selectall}updated description EN');
      cy.get('form').submit();
      cy.url().should('match', /\/projects$/);
      cy.task('getAllProjects').then(([updatedProject]) => {
        expect(updatedProject.titleFR).to.equal('updated title FR');
        expect(updatedProject.titleEN).to.equal('updated title EN');
        expect(updatedProject.descriptionFR).to.equal('updated description FR');
        expect(updatedProject.descriptionEN).to.equal('updated description EN');
      });
    });
  });
});
