import sequelize from '../../../db';

import MenuItemModel, { MenuItemCategory } from '../../../../models/menu-item';
import ProductionOrderModel from '../../../../models/production-order';
import OrderItemModel from '../../../../models/order-item';
import OrderModel from '../../../../models/orders';

const MenuItem = MenuItemModel(sequelize);
const ProductionOrder = ProductionOrderModel(sequelize);
const OrderItem = OrderItemModel(sequelize);
const Order = OrderModel(sequelize);

OrderItem.associate({ MenuItem, Order, ProductionOrder });
ProductionOrder.associate({ OrderItem });

export const createMenuItem = async (data: { description: string; price: number, category: MenuItemCategory }) => {
  return await MenuItem.create(data);
};

export const getMenuItemById = async (id: string) => {
  return await MenuItem.findByPk(id);
};

export const getMenuItemByDescription = async (description: string) => {
  return await MenuItem.findOne({ where: { description } });
}

export const updateMenuItem = async (id: string, data: { description?: string; price?: number; imageUrl?: string }) => {
  const menuItem = await MenuItem.findByPk(id);
  if (!menuItem) return null;
  return await menuItem.update(data);
};

export const deleteMenuItem = async (id: string) => {
  const menuItem = await MenuItem.findByPk(id);
  if (!menuItem) return false;
  await menuItem.destroy();
  return true;
};

export const listMenuItems = async () => {
  return await MenuItem.findAll();
};

export const isMenuItemInPendingProductionOrder = async (menuItemId: string) => {
  const count = await ProductionOrder.count({
    include: [{
      model: OrderItem,
      as: 'orderItems',
      where: {
        menuItemId,
      },
    }],
    where: {
      status: 'PENDING',
    },
  });

  return count > 0;
};

export const isMenuItemInOpenedOrder = async (menuItemId: string) => {
  const count = await OrderItem.count({
    where: {
      menuItemId,
    },
    include: [{
      model: Order,
      as: 'order',
      where: {
        status: 'OPENED',
      },
    }],
  });

  return count > 0;
};