import { apiClient } from '../api-client/apiClient';
import { DashboardSummarySchema, ActivitiesSchema } from '../utils/validators';
import { normalizeError, NormalizedError } from '../utils/errors';

export type DashboardSummary = z.infer<typeof DashboardSummarySchema>;
export type Activity = z.infer<typeof ActivitiesSchema>[number];

export const adminService = {
  async getDashboardSummary(): Promise<DashboardSummary> {
    try {
      const res = await apiClient.get('/admin/dashboard/summary');
      return DashboardSummarySchema.parse(res.data);
    } catch (err) {
      throw normalizeError(err);
    }
  },

  async getRecentActivities(params?: { limit?: number }): Promise<Activity[]> {
    try {
      const res = await apiClient.get('/admin/activities', { params });
      return ActivitiesSchema.parse(res.data);
    } catch (err) {
      throw normalizeError(err);
    }
  },
};
