import { Router } from 'express';
import {
  createMenuItemController,
  getMenuItemController,
  updateMenuItemController,
  deleteMenuItemController,
  listMenuItemsController,
} from '../../controllers/menuItemController';

const router = Router();

router.post('/', createMenuItemController);
router.get('/', listMenuItemsController);
router.get('/:id', getMenuItemController);
router.put('/:id', updateMenuItemController);
router.delete('/:id', deleteMenuItemController);

export default router;