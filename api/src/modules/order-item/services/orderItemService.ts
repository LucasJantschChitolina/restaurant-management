import {
  createOrderItem,
} from '../repositories/orderItemRepository'

interface CreateOrderItemProps {
  menuItemId: string;
  orderId: string;
}

export const createOrderItemService = async (data: CreateOrderItemProps) => {
  if (!data.menuItemId || !data.orderId) {
    throw new Error('Invalid order item data');
  }

  return await createOrderItem(data);
};