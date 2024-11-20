import {
  createProductionOrder,
  getProductionOrderById,
  updateProductionOrder,
  deleteProductionOrder,
  listProductionOrders,
} from '../repositories/productionOrderRepository';

import { ProductionOrderCreationAttributes, ProductionOrderUpdateAttributes } from '../../../../models/production-order';

export const createProductionOrderService = async (data: ProductionOrderCreationAttributes) => {
  if (!data.orderId || !data.status || !data.orderItemId) {
    throw new Error('Invalid production order data');
  }

  return await createProductionOrder(data);
};

export const getProductionOrderByIdService = async (id: string) => {
  return await getProductionOrderById(id);
};

export const updateProductionOrderService = async (id: string, data: ProductionOrderUpdateAttributes) => {
  return await updateProductionOrder(id, data);
};

export const deleteProductionOrderService = async (id: string) => {
  return await deleteProductionOrder(id);
};

export const listProductionOrdersService = async () => {
  return await listProductionOrders();
};