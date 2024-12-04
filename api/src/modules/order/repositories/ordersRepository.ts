import sequelize from '../../../db';

import OrderModel, { OrderCreationAttributes, OrderStatus, OrderUpdateAttributes } from '../../../../models/orders';

import UserModel from '../../../../models/user';

const Order = OrderModel(sequelize);
const User = UserModel(sequelize);

export const createOrder = async (data: OrderCreationAttributes) => {
  return await Order.create(data);
};

export const getOrderById = async (id: string) => {
  return await Order.findByPk(id);
};

export const updateOrder = async (id: string, data: OrderUpdateAttributes) => {
  const order = await Order.findByPk(id);
  if (!order) return null;
  return await order.update(data);
};

export const updateOrderValue = async (id: string, value: number) => {
  const order = await Order.findByPk(id);
  if (!order) return null;
  order.totalAmount = value;
  return await order.save();
}

export const closeOrder = async (id: string) => {
  const order = await Order.findByPk(id);
  if (!order) return null;

  order.status = OrderStatus.CLOSED;
  order.closedAt = new Date();

  return await order.save();
}

export const deleteOrder = async (id: string) => {
  const order = await Order.findByPk(id);
  if (!order) return false;
  await order.destroy();
  return true;
};

export const listOrders = async () => {
  return await Order.findAll();
};

// TODO: Implement the following function in the usersRepository.ts file
export const getWaiterById = async (id: string) => {
  return await User.findByPk(id);
};

export const listOrdersByStatus = async (status: OrderStatus) => {
  return await Order.findAll({ where: { status } });
};
