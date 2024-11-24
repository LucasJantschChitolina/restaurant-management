"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("ProductionOrders", "type", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "KITCHEN",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("ProductionOrders", "type");
  },
};
