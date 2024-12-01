import { Router } from 'express';
import { z } from 'zod';

import {
  createProductionOrderController,
  getProductionOrderController,
  updateProductionOrderController,
  deleteProductionOrderController,
  listProductionOrdersController,
  listProductionOrdersByStatusController,
  markAsDeliveredController,
} from '../controllers/productionOrderController';

import { validateRequest } from "../../../middlewares/validation";

const router = Router();

const createProductionOrderSchema = z.array(
  z.object({
    orderId: z.string().uuid({ message: 'Order ID must be a valid UUID' }),
    status: z.string().nonempty({ message: 'Status is required' }),
    menuItemId: z.string().uuid({ message: 'Menu item ID must be a valid UUID' }),
  })
);

const updateProductionOrderSchema = z.object({
  status: z.string().nonempty({ message: 'Status is required' }),
});

router.post('/', validateRequest(createProductionOrderSchema), createProductionOrderController);
router.get('/', listProductionOrdersController);
router.get('/:id', getProductionOrderController);
router.put('/:id', validateRequest(updateProductionOrderSchema), updateProductionOrderController);
router.delete('/:id', deleteProductionOrderController);
router.get('/status/:status', listProductionOrdersByStatusController);
router.patch('/:id/delivered', markAsDeliveredController);

export default router;