import sequelize from '../../../db';
import { QueryTypes } from 'sequelize';

interface DailySalesReport {
  date: string;
  totalOrders: number;
  totalAmount: number;
  averageOrderValue: number;
  itemsSold: {
    description: string;
    category: string;
    quantity: number;
    totalAmount: number;
  }[];
}

interface ItemSold {
  description: string;
  category: string;
  quantity: number;
  totalAmount: number;
}

export const getDailySalesReport = async (date: string): Promise<DailySalesReport> => {
  const totals = await sequelize.query(`
    SELECT 
      COUNT(id) as "totalOrders",
      SUM("totalAmount") as "totalAmount"
    FROM "Orders"
    WHERE "closedAt"::date = :date::date
    AND status = 'CLOSED'
  `, {
    replacements: { date },
    type: QueryTypes.SELECT
  });

  const itemsSold = await sequelize.query<ItemSold>(`
    SELECT 
      mi.description,
      mi.category,
      COUNT(oi.id) as quantity,
      SUM(mi.price) as totalAmount
    FROM "OrderItems" oi
    JOIN "Orders" o ON o.id = oi."orderId"
    JOIN "MenuItems" mi ON mi.id = oi."menuItemId"
    WHERE o."closedAt"::date = :date::date
    AND o.status = 'CLOSED'
    GROUP BY mi.description, mi.category
  `, {
    replacements: { date },
    type: QueryTypes.SELECT
  }) as ItemSold[];

  const { totalOrders, totalAmount } = totals[0] as any;

  return {
    date,
    totalOrders,
    totalAmount,
    averageOrderValue: totalAmount / totalOrders,
    itemsSold,
  };
}; 