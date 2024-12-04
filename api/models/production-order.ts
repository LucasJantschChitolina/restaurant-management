import { Model, DataTypes, Sequelize, UUIDV4 } from 'sequelize';

export interface ProductionOrderAttributes {
  id?: string;
  orderId: string;
  status: ProductionOrderStatus;
  type: string;
  orderItemId: string;
}
export type ProductionOrderCreationAttributes = Omit<ProductionOrderAttributes, 'id'>;

export type ProductionOrderUpdateAttributes = Omit<ProductionOrderAttributes, 'id'>;

export enum ProductionOrderStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  DELIVERED = 'DELIVERED',
}

export enum ProductionOrderType {
  KITCHEN = 'KITCHEN',
  BAR = 'BAR',
}

export default (sequelize: Sequelize) => {
  class ProductionOrder extends Model<ProductionOrderAttributes> implements ProductionOrderAttributes {
    public id!: string;
    public orderId!: string;
    public status!: ProductionOrderStatus;
    public type!: string;
    public orderItemId!: string;

    static associate(models: any) {
      ProductionOrder.hasMany(models.OrderItem, { foreignKey: 'orderId', as: 'orderItems' });
    }
  }

  ProductionOrder.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      orderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Order',
          key: 'id',
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      orderItemId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ProductionOrder',
      tableName: 'ProductionOrders',
    }
  );

  return ProductionOrder;
};