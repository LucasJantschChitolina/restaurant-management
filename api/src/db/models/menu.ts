import { DataTypes } from "sequelize"
import { db as sequelize } from "../index"
import { Product } from "./product"

const Menu = sequelize.define('menu', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: DataTypes.STRING(50),
})

Menu.hasMany(Product)

export { Menu }