import {
  createProductionOrder,
  deleteProductionOrder,
  getProductionOrderById,
  listProductionOrders,
  listProductionOrdersByStatus,
  updateProductionOrder,
} from '../repositories/productionOrderRepository';

import { OrderStatus } from '../../../../models/orders';
import { ProductionOrderStatus, ProductionOrderUpdateAttributes } from '../../../../models/production-order';
import { getMenuItemById } from '../../menu-item/repositories/menuItemRepository';
import { createOrderItemService } from '../../order-item/services/orderItemService';
import { getOrderById } from '../../order/repositories/ordersRepository';
import { increaseOrderValueService } from '../../order/services/orderService';

interface CreateProductionOrderProps {
  orderId: string;
  status: string;
  menuItemId: string;
}

export const createProductionOrderService = async (dataArray: CreateProductionOrderProps[]) => {
  if (!dataArray.length) {
    throw new Error('No production orders to create');
  }

  const { orderId } = dataArray[0];
  const order = await getOrderById(orderId);

  if (!order) {
    throw new Error('Order not found');
  }

  if (order.status !== OrderStatus.OPENED) {
    throw new Error('Order is not opened');
  }

  let totalPrice = 0;
  const productionOrders = [];

  for (const data of dataArray) {
    const menuItem = await getMenuItemById(data.menuItemId);
    if (!menuItem) {
      throw new Error(`Menu item not found: ${data.menuItemId}`);
    }

    const orderItem = await createOrderItemService({
      menuItemId: data.menuItemId,
      orderId: data.orderId
    });

    totalPrice += Number(menuItem.price);

    productionOrders.push(await createProductionOrder({
      orderId: data.orderId,
      status: data.status as ProductionOrderStatus,
      type: menuItem.category,
      orderItemId: orderItem.id
    }));
  }

  await increaseOrderValueService(orderId, totalPrice);

  return productionOrders;
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

export const listProductionOrdersByStatusService = async (status: ProductionOrderStatus) => {
  return await listProductionOrdersByStatus(status);
};

export const markAsDeliveredService = async (id: string) => {
  const productionOrder = await getProductionOrderById(id);

  if (!productionOrder) {
    throw new Error('Production order not found');
  }

  return await updateProductionOrder(id, { ...productionOrder, status: ProductionOrderStatus.DELIVERED });
};