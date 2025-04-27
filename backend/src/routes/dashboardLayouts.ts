// backend/src/routes/dashboardLayouts.ts
import { Router } from 'express';

export interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
}
const router: Router = Router();
export default router;

export interface DashboardLayoutDto {
  layout: LayoutItem[];
}
