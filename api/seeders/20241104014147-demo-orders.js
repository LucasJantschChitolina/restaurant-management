'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Orders', [
      {
        id: Sequelize.UUIDV4(),
        tableNumber: 1,
        customer: 'John Doe',
        status: 1,
        waiterId: Sequelize.UUIDV4(), // Deve estar relacionado com um usuário existente
        openedAt: new Date(),
        closedAt: null,
        totalAmount: 150.50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.UUIDV4(),
        tableNumber: 2,
        customer: 'Jane Smith',
        status: 0,
        waiterId: Sequelize.UUIDV4(), // Deve estar relacionado com um usuário existente
        openedAt: new Date(),
        closedAt: null,
        totalAmount: 75.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  }
};
