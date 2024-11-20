import { Model, DataTypes, Sequelize, UUIDV4 } from 'sequelize';

export interface ProductionOrderAttributes {
  id?: string;
  orderId: string;
  status: string;
  orderItemId: string;
}
export type ProductionOrderCreationAttributes = Omit<ProductionOrderAttributes, 'id'>;

export type ProductionOrderUpdateAttributes = Omit<ProductionOrderAttributes, 'id'>;

export enum ProductionOrderStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export default (sequelize: Sequelize) => {
  class ProductionOrder extends Model<ProductionOrderAttributes> implements ProductionOrderAttributes {
    public id!: string;
    public orderId!: string;
    public status!: string;
    public orderItemId!: string;

    static associate(models: any) {
      // define association here
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
      },
      status: {
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