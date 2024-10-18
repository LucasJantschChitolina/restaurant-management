import { DataTypes } from "sequelize"
import { db as sequelize } from "../index"
import { Product } from "./product"

const ProductionOrder = sequelize.define('production_order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM,
    values: ['pending', 'in_production', 'waiting_delivery', 'completed', 'cancelled'],
    defaultValue: 'pending',
  },
  type: {
    type: DataTypes.ENUM,
    values: ['food', 'drink']
  },
  delivery_date: DataTypes.DATE,
})

ProductionOrder.hasMany(Product)

export { ProductionOrder }

