'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('MenuItems', [
      {
        id: Sequelize.UUIDV4(),
        description: 'Cheeseburger',
        price: 25.99,
        category: 'FOOD',
        imageUrl: 'https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4=',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.UUIDV4(),
        description: 'Pizza Margherita',
        price: 30.50,
        category: 'FOOD',
        imageUrl: 'https://example.com/pizza.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MenuItems', null, {});
  }
};
