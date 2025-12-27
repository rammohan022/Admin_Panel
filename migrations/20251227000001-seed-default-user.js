'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('Admin@123', 10);

    // Check if user already exists
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM Users WHERE email = 'ram@webexbytes.com' LIMIT 1;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (users.length === 0) {
      await queryInterface.bulkInsert('Users', [{
        name: 'Ram Mohan',
        email: 'ram@webexbytes.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { email: 'ram@webexbytes.com' });
  }
};
