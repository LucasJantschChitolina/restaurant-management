import { Model, DataTypes, Sequelize, UUIDV4 } from 'sequelize';

export interface OrderItemAttributes {
  id?: string;
  menuItemId: string;
  orderId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type OrderItemCreationAttributes = Omit<OrderItemAttributes, 'id' | 'createdAt' | 'updatedAt'>;

export default (sequelize: Sequelize) => {
  class OrderItem extends Model<OrderItemAttributes> implements OrderItemAttributes {
    public id!: string;
    public menuItemId!: string;
    public orderId!: string;
    public createdAt!: Date;
    public updatedAt!: Date;

    static associate(models: any) {
      // define association here
      OrderItem.belongsTo(models.MenuItem, { foreignKey: 'menuItemId', as: 'menuItem' });
      OrderItem.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
    }
  }

  OrderItem.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      menuItemId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'MenuItem',
          key: 'id',
        },
      },
      orderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Order',
          key: 'id',
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'OrderItem',
      tableName: 'OrderItems',
    }
  );

  return OrderItem;
};