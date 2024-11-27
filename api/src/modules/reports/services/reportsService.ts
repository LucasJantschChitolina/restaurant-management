import { getDailySalesReport } from '../repositories/reportsRepository';

export const getDailySalesReportService = async (date: string) => {
  return await getDailySalesReport(date);
}; 