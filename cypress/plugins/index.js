/// <reference types="cypress" />
const User = require('../../models/user');
const Project = require('../../models/project');
const ms = require('smtp-tester');

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
  // modify config values
  config.defaultCommandTimeout = 15000;

  const mailServer = ms.init(7777);
  const lastEmail = {};
  mailServer.bind((addr, id, email) => {
    lastEmail[email.headers.to] = {
      body: email.body,
      html: email.html,
    };
  });

  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    cleanDb: async () => Promise.all([User.deleteMany(), Project.deleteMany()]),
    createSampleProject: async (title = 'P1') =>
      Project.createProject({
        title,
        description: `${title} description`,
        mainPictureUrl:
          'https://ucarecdn.com/be32d5a2-4ef2-4a47-8e73-7142f80ae188/ms_project_2013_2.jpg',
      }),
    deleteAllUsers: User.deleteMany,
    deleteAllProjects: Project.deleteMany,
    findUserByEmail: User.findByEmail,
    createUser: User.createUser,
    getLastEmail(userEmail) {
      return lastEmail[userEmail] || null;
    },
    deleteUserByEmail(email) {
      return User.delete({ where: { email } }).catch(() => false);
    },
  });
};
