import { MenuItemCategory } from '../../../../models/menu-item';
import {
  createMenuItem,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
  listMenuItems,
} from '../repositories/menuItemRepository';

export const createMenuItemService = async (data: { description: string; price: number, category: MenuItemCategory }) => {
  if (!data.description || data.price <= 0 || !data.category) {
    throw new Error('Invalid menu item data');
  }

  if (!Object.values(MenuItemCategory).includes(data.category)) {
    throw new Error(`Invalid menu item category, must be one of: ${Object.values(MenuItemCategory).join(', ')}`);
  }

  return await createMenuItem(data);
};

export const getMenuItemService = async (id: string) => {
  const menuItem = await getMenuItemById(id);
  if (!menuItem) {
    throw new Error('Menu item not found');
  }
  return menuItem;
};

export const updateMenuItemService = async (id: string, data: { description?: string; price?: number }) => {
  const menuItem = await updateMenuItem(id, data);
  if (!menuItem) {
    throw new Error('Menu item not found');
  }
  return menuItem;
};

export const deleteMenuItemService = async (id: string) => {
  const success = await deleteMenuItem(id);
  if (!success) {
    throw new Error('Menu item not found');
  }

  return success;
};

export const listMenuItemsService = async () => {
  return await listMenuItems();
};
