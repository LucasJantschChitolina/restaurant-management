import { Router } from 'express';
import {
  createMenuItemController,
  getMenuItemController,
  updateMenuItemController,
  deleteMenuItemController,
  listMenuItemsController,
} from '../controllers/menuItemController';
import { validateRequest } from '../../../middlewares/validation';
import { z } from 'zod';
import { MenuItemCategory } from '../../../../models/menu-item';

const router = Router();

const menuItemSchema = z.object({
  description: z.string().nonempty({ message: 'Description is required' }),
  price: z.number().positive({ message: 'Price must be greater than 0' }),
  category: z.nativeEnum(MenuItemCategory, { errorMap: () => ({ message: `Invalid menu item category, must be one of: ${Object.values(MenuItemCategory).join(', ')}` }) }),
  imageUrl: z.string().url().optional(),
});

const updateMenuItemSchema = z.object({
  description: z.string().optional(),
  price: z.number().positive({ message: 'Price must be greater than 0' }).optional(),
  imageUrl: z.string().url().optional(),
});

router.post('/', validateRequest(menuItemSchema), createMenuItemController);
router.get('/', listMenuItemsController);
router.get('/:id', getMenuItemController);
router.put('/:id', validateRequest(updateMenuItemSchema), updateMenuItemController);
router.delete('/:id', deleteMenuItemController);

export default router;