import { Request, Response } from 'express';
import { getDailySalesReportService } from '../services/reportsService';

export const getDailySalesReportController = async (req: Request, res: Response) => {
  try {
    const date = req.query.date as string || new Date().toISOString().split('T')[0];
    const report = await getDailySalesReportService(date);
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}; 