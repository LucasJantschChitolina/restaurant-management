import OrderItemModel from '../../../../models/order-item';
import sequelize from '../../../db';

const OrderItem = OrderItemModel(sequelize);

export const createOrderItem = async (data: { menuItemId: string; orderId: string }) => {
  return await OrderItem.create(data);
};

export const getOrderItemById = async (id: string) => {
  return await OrderItem.findByPk(id);
};

export const updateOrderItem = async (id: string, data: { menuItemId?: string; orderId?: string }) => {
  const orderItem = await OrderItem.findByPk(id);
  if (!orderItem) return null;
  return await orderItem.update(data);
};

export const deleteOrderItem = async (id: string) => {
  const orderItem = await OrderItem.findByPk(id);
  if (!orderItem) return false;
  await orderItem.destroy();
  return true;
};

export const listOrderItems = async () => {
  return await OrderItem.findAll();
};

export const getOrderItemsByOrderId = async (orderId: string) => {
  return await OrderItem.findAll({
    where: {
      orderId,
    },
  });
};