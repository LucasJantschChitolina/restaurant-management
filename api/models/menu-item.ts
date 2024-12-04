import { Model, DataTypes, Sequelize, UUIDV4 } from 'sequelize';

interface MenuItemAttributes {
  id?: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
}

export enum MenuItemCategory {
  FOOD = 'FOOD',
  DRINK = 'DRINK',
}

export default (sequelize: Sequelize) => {
  class MenuItem extends Model<MenuItemAttributes> implements MenuItemAttributes {
    public id!: string;
    public description!: string;
    public price!: number;
    public category!: string;
    public imageUrl?: string;

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
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: 'MenuItem',
      tableName: 'MenuItems',
    }
  );

  return MenuItem;
};