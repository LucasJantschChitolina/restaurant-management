import { Router } from 'express';
import { getDailySalesReportController } from '../controllers/reportsController';

const router = Router();

router.get('/daily-sales', getDailySalesReportController);

export default router; 