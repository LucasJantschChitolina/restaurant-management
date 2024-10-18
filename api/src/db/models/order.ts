import { DataTypes } from "sequelize"
import { db as sequelize } from "../index"
import { ProductionOrder } from "./production-order"

const Order = sequelize.define('order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
})

Order.hasMany(ProductionOrder)

export { Order }