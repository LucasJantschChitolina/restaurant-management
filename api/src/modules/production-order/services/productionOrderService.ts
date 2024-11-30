import {
  createProductionOrder,
  deleteProductionOrder,
  getProductionOrderById,
  listProductionOrders,
  updateProductionOrder,
} from '../repositories/productionOrderRepository';

import { OrderStatus } from '../../../../models/orders';
import { ProductionOrderUpdateAttributes } from '../../../../models/production-order';
import { getMenuItemById } from '../../menu-item/repositories/menuItemRepository';
import { createOrderItemService } from '../../order-item/services/orderItemService';
import { increaseOrderValueService } from '../../order/services/orderService';
import { getOrderById } from '../../order/repositories/ordersRepository';

interface CreateProductionOrderProps {
  orderId: string;
  status: string;
  menuItemId: string;
}

export const createProductionOrderService = async (dataArray: CreateProductionOrderProps[]) => {
  if (!dataArray.length) {
    throw new Error('No production orders to create');
  }

  const { orderId } = dataArray[0]; // All orders should have the same orderId
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
      status: data.status,
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