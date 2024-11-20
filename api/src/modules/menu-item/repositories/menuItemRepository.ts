import MenuItemModel from '../../../../models/menu-item';
import sequelize from '../../../db';

const MenuItem = MenuItemModel(sequelize);

export const createMenuItem = async (data: { description: string; price: number }) => {
  return await MenuItem.create(data);
};

export const getMenuItemById = async (id: string) => {
  return await MenuItem.findByPk(id);
};

export const updateMenuItem = async (id: string, data: { description?: string; price?: number }) => {
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
