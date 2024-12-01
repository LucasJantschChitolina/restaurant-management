import ProductionOrderModel, { ProductionOrderCreationAttributes, ProductionOrderStatus, ProductionOrderUpdateAttributes } from '../../../../models/production-order';
import sequelize from '../../../db';
import OrderItemModel from '../../../../models/order-item';
import MenuItemModel from '../../../../models/menu-item';
import OrderModel from '../../../../models/orders';

const ProductionOrder = ProductionOrderModel(sequelize);
const OrderItem = OrderItemModel(sequelize);
const MenuItem = MenuItemModel(sequelize);
const Order = OrderModel(sequelize);

export const createProductionOrder = async (data: ProductionOrderCreationAttributes) => {
  return await ProductionOrder.create(data);
};

export const getProductionOrderById = async (id: string) => {
  return await ProductionOrder.findByPk(id);
};

export const updateProductionOrder = async (id: string, data: ProductionOrderUpdateAttributes) => {
  const productionOrder = await ProductionOrder.findByPk(id);
  if (!productionOrder) return null;
  return await productionOrder.update(data);
};

export const deleteProductionOrder = async (id: string) => {
  const productionOrder = await ProductionOrder.findByPk(id);
  if (!productionOrder) return false;
  await productionOrder.destroy();
  return true;
};

export const listProductionOrders = async () => {
  const productionOrders = await ProductionOrder.findAll({});
  const orderItems = await OrderItem.findAll({});
  const menuItems = await MenuItem.findAll({});
  const orders = await Order.findAll({});

  return productionOrders.map(productionOrder => {
    const orderItem = orderItems.find(item => item.id === productionOrder.orderItemId);
    const menuItem = menuItems.find(item => item.id === orderItem?.menuItemId);
    const order = orders.find(item => item.id === productionOrder.orderId);
    
    return { ...productionOrder.dataValues, menuItem: menuItem, order: order };
  });
};

export const listProductionOrdersByStatus = async (status: ProductionOrderStatus) => {
  const productionOrders = await ProductionOrder.findAll({ where: { status } });
  const orderItems = await OrderItem.findAll({});
  const menuItems = await MenuItem.findAll({});
  const orders = await Order.findAll({});

  return productionOrders.map(productionOrder => {
    const orderItem = orderItems.find(item => item.id === productionOrder.orderItemId);
    const menuItem = menuItems.find(item => item.id === orderItem?.menuItemId);
    const order = orders.find(item => item.id === productionOrder.orderId);
    
    return { ...productionOrder.dataValues, menuItem: menuItem, order: order };
  });
};