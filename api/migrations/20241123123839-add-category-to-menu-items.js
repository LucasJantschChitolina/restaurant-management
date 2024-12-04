"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("MenuItems", "category", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "FOOD",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("MenuItems", "category");
  },
};
