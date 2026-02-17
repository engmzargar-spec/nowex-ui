// nowex-ui/shared/data/utils/validators.ts
import { z } from 'zod';

/**
 * اعتبارسنجی داده‌های داشبورد ادمین
 */
export const DashboardSummarySchema = z.object({
  widgets: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      value: z.number(),
    })
  ),
  lastUpdated: z.string().datetime(),
});

/**
 * اعتبارسنجی لیست فعالیت‌ها
 */
export const ActivitySchema = z.object({
  id: z.string(),
  actor: z.string(),
  action: z.string(),
  at: z.string().datetime(),
});

export const ActivitiesSchema = z.array(ActivitySchema);
