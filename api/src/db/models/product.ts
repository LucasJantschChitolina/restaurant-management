import { DataTypes } from "sequelize"
import { db as sequelize } from "../index"

const Product = sequelize.define('product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: DataTypes.STRING(50),
  description: DataTypes.TEXT,
  type: {
    type: DataTypes.ENUM,
    values: ['food', 'drink']
  },
  image_url: DataTypes.TEXT,
  price: DataTypes.DECIMAL(10, 2),
})

export { Product }