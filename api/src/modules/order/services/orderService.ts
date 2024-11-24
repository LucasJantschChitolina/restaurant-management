import {
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  listOrders,
  getWaiterById,
  updateOrderValue,
  closeOrder,
} from '../repositories/ordersRepository';

import { OrderAttributes, OrderStatus } from '../../../../models/orders';

export const createOrderService = async (data: OrderAttributes) => {
  const validWaiter = await getWaiterById(data.waiterId);

  if (!validWaiter) {
    throw new Error('Waiter not found');
  }

  return await createOrder(data);
};

export const closeOrderService = async (id: string) => {
  const order = await getOrderById(id);

  if (!order) {
    throw new Error('Order not found');
  }

  const updatedOrder = await closeOrder(id);

  return updatedOrder;
};

export const increaseOrderValueService = async (id: string, menuItemPrice: number) => {
  const order = await getOrderById(id);

  if (!order) {
    throw new Error('Order not found');
  }

  order.totalAmount = Number(order.totalAmount || 0) + Number(menuItemPrice);

  const updatedOrder = await updateOrderValue(id, order.totalAmount);

  return updatedOrder;
};

export const getOrderByIdService = async (id: string) => {
  return await getOrderById(id);
};

export const updateOrderService = async (id: string, data: OrderAttributes) => {
  return await updateOrder(id, data);
};

export const deleteOrderService = async (id: string) => {
  return await deleteOrder(id);
};

export const listOrdersService = async () => {
  return await listOrders();
};