import { DataTypes, Model, InferCreationAttributes, InferAttributes, CreationOptional } from "sequelize";
import { db as sequelize } from "../index";

const User = sequelize.define('user', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: DataTypes.TEXT,
});

export { User };