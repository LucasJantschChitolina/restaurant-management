'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ProductionOrders', [
      {
        id: Sequelize.UUIDV4(),
        orderId: Sequelize.UUIDV4(), // Deve estar relacionado com um pedido existente
        status: 1,
        orderItemId: Sequelize.UUIDV4(), // Deve estar relacionado com um item de pedido existente
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.UUIDV4(),
        orderId: Sequelize.UUIDV4(), // Deve estar relacionado com um pedido existente
        status: 0,
        orderItemId: Sequelize.UUIDV4(), // Deve estar relacionado com um item de pedido existente
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductionOrders', null, {});
  }
};
