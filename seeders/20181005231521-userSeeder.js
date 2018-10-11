'use strict';
var bcrypt = require('bcrypt-nodejs');
module.exports = {
  up: (queryInterface, Sequelize) => {
    var pass = bcrypt.hashSync(1, bcrypt.genSaltSync(12), null);
    return queryInterface.bulkInsert('Users', [
      {
        id: '1',
        email: '1@gmail.com',
        password: pass,
        fname: 'fname1',
        lname: 'lname1',
        role: '1',
        key: null,
        validated: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
