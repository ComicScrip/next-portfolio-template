/// <reference types="cypress" />
const User = require("../../models/user");
const Project = require("../../models/project");
const ms = require("smtp-tester");
const dotenvPlugin = require("cypress-dotenv");

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
  config = dotenvPlugin(config);
  const mailServer = ms.init(7777);
  const lastEmail = {};
  mailServer.bind((addr, id, email) => {
    lastEmail[email.headers.to] = {
      body: email.body,
      html: email.html,
    };
  });
  on("task", {
    cleanDb: async () => Promise.all([User.deleteMany(), Project.deleteMany()]),
    createSampleProject: async ({
      titleFR = "P1 - FR",
      titleEN = "P1 - EN",
      descriptionFR = "description FR",
      descriptionEN = "description EN",
    } = {}) =>
      Project.createProject({
        titleEN,
        titleFR,
        descriptionEN,
        descriptionFR,
        mainPictureUrl:
          "https://ucarecdn.com/be32d5a2-4ef2-4a47-8e73-7142f80ae188/ms_project_2013_2.jpg",
      }),
    deleteAllUsers: User.deleteMany,
    deleteAllProjects: Project.deleteMany,
    getAllProjects: Project.getProjects,
    findUserByEmail: User.findByEmail,
    createUser: User.createUser,
    getLastEmail(userEmail) {
      return lastEmail[userEmail] || null;
    },
    deleteUserByEmail(email) {
      return User.delete({ where: { email } }).catch(() => false);
    },
  });
  return config;
};
