"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Orders", "customer", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("Orders", "status", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.changeColumn("Orders", "waiterId", {
      type: Sequelize.UUID,
      allowNull: false,
    });
    await queryInterface.changeColumn("Orders", "openedAt", {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Orders", "customer", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("Orders", "status", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn("Orders", "waiterId", {
      type: Sequelize.UUID,
      allowNull: true,
    });
    await queryInterface.changeColumn("Orders", "openedAt", {
      type: Sequelize.DATE,
      defaultValue: null,
    });
  },
};
