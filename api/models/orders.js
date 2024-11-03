'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
      Order.belongsTo(models.User, { foreignKey: 'waiterId', as: 'waiter' });
      Order.hasMany(models.OrderItem, { foreignKey: 'orderId' });
      Order.hasMany(models.ProductionOrder, { foreignKey: 'orderId' });
    }
  }
  Order.init({
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
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
