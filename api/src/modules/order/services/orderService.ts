import {
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  listOrders,
  getWaiterById,
  updateOrderValue,
  closeOrder,
  listOrdersByStatus,
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

export const increaseOrderValueService = async (orderId: string, value: number) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new Error('Order not found');
  }

  const currentTotal = Number(order.totalAmount || 0);
  const valueToAdd = Number(value);
  
  const newTotal = currentTotal + valueToAdd;

  return await updateOrderValue(orderId, newTotal);
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

export const listOrdersByStatusService = async (status: OrderStatus) => {
  return await listOrdersByStatus(status);
};
