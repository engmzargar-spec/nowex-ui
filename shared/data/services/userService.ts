// nowex-ui/shared/data/services/userService.ts
import { apiClient } from '../api-client/apiClient';
import { normalizeError } from '../utils/errors';
import { z } from 'zod';

/**
 * اعتبارسنجی داده‌های پروفایل کاربر
 */
const UserProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  joinedAt: z.string().datetime(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;

export const userService = {
  async getProfile(): Promise<UserProfile> {
    try {
      const res = await apiClient.get('/user/profile');
      return UserProfileSchema.parse(res.data);
    } catch (err) {
      throw normalizeError(err);
    }
  },
};
