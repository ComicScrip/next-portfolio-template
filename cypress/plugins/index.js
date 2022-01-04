const Project = require('../../models/project');
const User = require('../../models/user');

/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars

module.exports = (on, config) => {
  on('task', {
    resetDB: () => Promise.all([Project.deleteMany(), User.deleteMany()]),
    createSampleProject: (title) => {
      return Project.createProject({
        title,
        description: `${title} description`,
        mainPictureUrl:
          'https://ucarecdn.com/be32d5a2-4ef2-4a47-8e73-7142f80ae188/ms_project_2013_2.jpg',
      });
    },
    findUserByEmail: User.findByEmail,
    createUser: User.createUser,
  });
};
