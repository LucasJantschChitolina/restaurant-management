'use strict';
const DataTypes = require("sequelize")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      tableNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      customer: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.INTEGER,
      },
      waiterId: {
        type: DataTypes.UUID,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      openedAt: {
        type: DataTypes.DATE,
      },
      closedAt: {
        type: DataTypes.DATE,
      },
      totalAmount: {
        type: DataTypes.DECIMAL,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};