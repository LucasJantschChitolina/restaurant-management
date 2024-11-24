import ProductionOrderModel, { ProductionOrderCreationAttributes, ProductionOrderUpdateAttributes } from '../../../../models/production-order';
import sequelize from '../../../db';

const ProductionOrder = ProductionOrderModel(sequelize);

export const createProductionOrder = async (data: ProductionOrderCreationAttributes) => {
  return await ProductionOrder.create(data);
};

export const getProductionOrderById = async (id: string) => {
  return await ProductionOrder.findByPk(id);
};

export const updateProductionOrder = async (id: string, data: ProductionOrderUpdateAttributes) => {
  const productionOrder = await ProductionOrder.findByPk(id);
  if (!productionOrder) return null;
  return await productionOrder.update(data);
};

export const deleteProductionOrder = async (id: string) => {
  const productionOrder = await ProductionOrder.findByPk(id);
  if (!productionOrder) return false;
  await productionOrder.destroy();
  return true;
};

export const listProductionOrders = async () => {
  return await ProductionOrder.findAll();
};