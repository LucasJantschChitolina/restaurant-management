import { MenuItemCategory } from '../../../../models/menu-item';
import {
  createMenuItem,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
  listMenuItems,
  getMenuItemByDescription,
  isMenuItemInPendingProductionOrder,
  isMenuItemInOpenedOrder,
} from '../repositories/menuItemRepository';

export const createMenuItemService = async (data: { description: string; price: number; category: MenuItemCategory }) => {
  const existingMenuItem = await getMenuItemByDescription(data.description);

  if (existingMenuItem) {
    throw new Error('Menu item already exists');
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
  const inPendingProductionOrder = await isMenuItemInPendingProductionOrder(id);
  const inOpenedOrder = await isMenuItemInOpenedOrder(id);

  if (inPendingProductionOrder || inOpenedOrder) {
    throw new Error('Cannot update menu item that is in pending production orders or opened orders');
  }

  const menuItem = await updateMenuItem(id, data);
  if (!menuItem) {
    throw new Error('Menu item not found');
  }
  return menuItem;
};

export const deleteMenuItemService = async (id: string) => {
  const inPendingProductionOrder = await isMenuItemInPendingProductionOrder(id);
  const inOpenedOrder = await isMenuItemInOpenedOrder(id);

  if (inPendingProductionOrder || inOpenedOrder) {
    throw new Error('Cannot delete menu item that is in pending production orders or opened orders');
  }

  const success = await deleteMenuItem(id);
  if (!success) {
    throw new Error('Menu item not found');
  }
  return success;
};

export const listMenuItemsService = async () => {
  return await listMenuItems();
};