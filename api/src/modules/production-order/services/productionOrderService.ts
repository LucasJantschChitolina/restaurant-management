import {
  createProductionOrder,
  deleteProductionOrder,
  getProductionOrderById,
  listProductionOrders,
  updateProductionOrder,
} from '../repositories/productionOrderRepository';

import { ProductionOrderStatus, ProductionOrderUpdateAttributes } from '../../../../models/production-order';
import { getMenuItemById } from '../../menu-item/repositories/menuItemRepository';
import { createOrderItemService } from '../../order-item/services/orderItemService';

interface CreateProductionOrderProps {
  orderId: string;
  status: string;
  menuItemId: string;
}

export const createProductionOrderService = async (data: CreateProductionOrderProps) => {
  if (!data.orderId || !data.status || !data.menuItemId) {
    throw new Error('Invalid production order data');
  }

  if (data.status !== ProductionOrderStatus.PENDING) {
    throw new Error(`Invalid production order status. The production order must be ${ProductionOrderStatus.PENDING} when created`);
  }

  const menuItem = await getMenuItemById(data.menuItemId);

  if (!menuItem) {
    throw new Error('Menu item not found');
  }

  const orderItem = await createOrderItemService({
    menuItemId: data.menuItemId,
    orderId: data.orderId
  })

  return await createProductionOrder({
    orderId: data.orderId,
    status: data.status,
    type: menuItem.category,
    orderItemId: orderItem.id
  });
};

export const getProductionOrderByIdService = async (id: string) => {
  return await getProductionOrderById(id);
};

export const updateProductionOrderService = async (id: string, data: ProductionOrderUpdateAttributes) => {
  // TODO: validate status transition

  return await updateProductionOrder(id, data);
};

export const deleteProductionOrderService = async (id: string) => {
  return await deleteProductionOrder(id);
};

export const listProductionOrdersService = async () => {
  return await listProductionOrders();
};