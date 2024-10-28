'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Items', [
      {
        name: 'Pizza Margherita',
        category: 'prato',
        price: 25.0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Suco de Laranja',
        category: 'bebida',
        price: 8.0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hambúrguer Clássico',
        category: 'prato',
        price: 20.0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Refrigerante',
        category: 'bebida',
        price: 5.0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {})
  }
}
// para executar, após configurado o banco postgres, executar: npx sequelize-cli db:seed:all
