'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('MenuItems', [
      {
        id: Sequelize.UUIDV4(),
        description: 'Cheeseburger',
        price: 25.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.UUIDV4(),
        description: 'Pizza Margherita',
        price: 30.50,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MenuItems', null, {});
  }
};
