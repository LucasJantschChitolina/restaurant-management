import { Model, DataTypes, Sequelize, UUIDV4 } from 'sequelize';

interface MenuItemAttributes {
  id?: string;
  description: string;
  price: number;
}

export default (sequelize: Sequelize) => {
  class MenuItem extends Model<MenuItemAttributes> implements MenuItemAttributes {
    public id!: string;
    public description!: string;
    public price!: number;

    static associate(models: any) {
      // define association here
    }
  }

  MenuItem.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'MenuItem',
      tableName: 'MenuItems',
    }
  );

  return MenuItem;
};