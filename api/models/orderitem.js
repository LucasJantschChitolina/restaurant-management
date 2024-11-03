'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderItem.init({
    id: DataTypes.UUID,
    menuItemId: DataTypes.UUID,
    orderId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'OrderItem',
  });
  return OrderItem;
};