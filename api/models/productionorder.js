'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductionOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductionOrder.init({
    id: DataTypes.UUID,
    orderId: DataTypes.UUID,
    status: DataTypes.INTEGER,
    orderItemId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'ProductionOrder',
  });
  return ProductionOrder;
};