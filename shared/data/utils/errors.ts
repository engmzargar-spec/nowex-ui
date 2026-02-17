// nowex-ui/shared/data/utils/errors.ts

export type NormalizedError = {
  status: number;       // کد وضعیت HTTP
  code: string;         // کد خطای بک‌اند یا پیش‌فرض
  message: string;      // پیام قابل نمایش
  details?: any;        // جزئیات اضافی (اختیاری)
};

/**
 * ساخت یک خطای نرمال‌شده
 */
export function normalizeError(err: any): NormalizedError {
  return {
    status: err.status || 0,
    code: err.code || 'UNKNOWN_ERROR',
    message: err.message || 'خطای ناشناخته رخ داده است',
    details: err.details || null,
  };
}
