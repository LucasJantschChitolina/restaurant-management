'use strict';

const menuItemImages = {
  'Cheeseburger': 'https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4=',
  'Pizza Margherita': 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&auto=format&fit=crop&q=60',
};

module.exports = {
  async up(queryInterface, Sequelize) {
    for (const [description, imageUrl] of Object.entries(menuItemImages)) {
      await queryInterface.sequelize.query(`
        UPDATE "MenuItems"
        SET "imageUrl" = :imageUrl
        WHERE description = :description
      `, {
        replacements: { imageUrl, description }
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      UPDATE "MenuItems"
      SET "imageUrl" = NULL
      WHERE description IN (:descriptions)
    `, {
      replacements: { descriptions: Object.keys(menuItemImages) }
    });
  }
}; 