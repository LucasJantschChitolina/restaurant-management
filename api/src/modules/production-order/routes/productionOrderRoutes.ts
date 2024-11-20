import { Router } from 'express';
import {
  createProductionOrderController,
  getProductionOrderController,
  updateProductionOrderController,
  deleteProductionOrderController,
  listProductionOrdersController,
} from '../controllers/productionOrderController';

const router = Router();

router.post('/', createProductionOrderController);
router.get('/', listProductionOrdersController);
router.get('/:id', getProductionOrderController);
router.put('/:id', updateProductionOrderController);
router.delete('/:id', deleteProductionOrderController);

export default router;