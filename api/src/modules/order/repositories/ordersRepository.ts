import OrderModel, { OrderCreationAttributes, OrderUpdateAttributes } from '../../../../models/orders';
import sequelize from '../../../db';

const Order = OrderModel(sequelize);

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

export const deleteOrder = async (id: string) => {
  const order = await Order.findByPk(id);
  if (!order) return false;
  await order.destroy();
  return true;
};

export const listOrders = async () => {
  return await Order.findAll();
};

export const findOrderByTableNumberAndStatus = async (tableNumber: number, status: string) => {
  return await Order.findOne({
    where: {
      tableNumber,
      status,
    },
  });
};