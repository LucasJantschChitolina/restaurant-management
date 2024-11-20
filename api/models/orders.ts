import { Model, DataTypes, Sequelize, UUIDV4 } from 'sequelize';

export interface OrderAttributes {
  id?: string;
  tableNumber: number;
  customer: string;
  status: string;
  waiterId: string;
  openedAt?: Date;
  closedAt?: Date;
  totalAmount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type OrderCreationAttributes = Omit<OrderAttributes, 'id' | 'createdAt' | 'updatedAt' | 'openedAt' | 'totalAmount'>;

export type OrderUpdateAttributes = Omit<OrderAttributes, 'id' | 'createdAt' | 'updatedAt' | 'openedAt'>;

export enum OrderStatus {
  OPENED = 'opened',
  CLOSED = 'closed',
}

export default (sequelize: Sequelize) => {
  class Order extends Model<OrderAttributes> implements OrderAttributes {
    public id!: string;
    public tableNumber!: number;
    public customer!: string;
    public status!: string;
    public waiterId!: string;
    public openedAt!: Date;
    public closedAt?: Date;
    public totalAmount?: number;
    public createdAt!: Date;
    public updatedAt!: Date;

    static associate(models: any) {
      Order.belongsTo(models.User, { foreignKey: 'waiterId', as: 'waiter' });
      Order.hasMany(models.OrderItem, { foreignKey: 'orderId' });
      Order.hasMany(models.ProductionOrder, { foreignKey: 'orderId' });
    }
  }

  Order.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      tableNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      customer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      waiterId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      openedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      closedAt: {
        type: DataTypes.DATE,
      },
      totalAmount: {
        type: DataTypes.DECIMAL,
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
      modelName: 'Order',
      tableName: 'Orders',
    }
  );

  return Order;
};