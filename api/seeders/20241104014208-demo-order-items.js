'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('OrderItems', [
      {
        id: Sequelize.UUIDV4(),
        menuItemId: Sequelize.UUIDV4(), // Deve estar relacionado com um item de menu existente
        orderId: Sequelize.UUIDV4(), // Deve estar relacionado com um pedido existente
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.UUIDV4(),
        menuItemId: Sequelize.UUIDV4(), // Deve estar relacionado com um item de menu existente
        orderId: Sequelize.UUIDV4(), // Deve estar relacionado com um pedido existente
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OrderItems', null, {});
  }
};
