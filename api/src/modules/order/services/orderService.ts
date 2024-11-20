import {
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  listOrders,
  findOrderByTableNumberAndStatus,
} from '../repositories/ordersRepository';

import { OrderAttributes, OrderStatus } from '../../../../models/orders';

export const createOrderService = async (data: OrderAttributes) => {
  if (!data.tableNumber || !data.customer || !data.status || !data.waiterId) {
    throw new Error('Invalid order data');
  }

  if (!data.status === OrderStatus.OPENED) {
    throw new Error('Invalid order status');
  }

  const existingOrder = await findOrderByTableNumberAndStatus(data.tableNumber, 'opened');

  if (existingOrder) {
    throw new Error('Table is already open');
  }

  return await createOrder(data);
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