// nowex-ui/shared/data/api-client/apiClient.ts
import axios, { AxiosError } from 'axios';

/**
 * نکته امنیتی:
 * - baseURL فقط باید به دامنه‌های معتبر اشاره کند (ترجیحاً از env).
 * - زمان‌سنج و هدرها را اینجا متمرکز نگه می‌داریم.
 */
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

export const apiClient = axios.create({
  baseURL,
  timeout: 8000, // قابل تنظیم به‌صورت per-service
  withCredentials: true, // اگر نیاز به کوکی هست؛ در غیر این صورت false کنید
});

// هدرهای پیش‌فرض (بدون توکن؛ توکن در interceptor درخواست اضافه می‌شود)
apiClient.defaults.headers.common['Content-Type'] = 'application/json';

// توکن‌ها فقط از حافظه خوانده می‌شوند (نه localStorage)
let accessTokenMemory: string | null = null;
export const tokenMemory = {
  get: () => accessTokenMemory,
  set: (token: string | null) => { accessTokenMemory = token; },
  clear: () => { accessTokenMemory = null; },
};

// درخواست‌ها: افزودن Authorization در صورت وجود توکن
apiClient.interceptors.request.use((config) => {
  const token = tokenMemory.get();
  if (token && config.url && config.url.startsWith(baseURL)) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

// پاسخ‌ها: نرمال‌سازی خطاها
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // شکل خطای یکنواخت برای UI
    const normalized = {
      status: error.response?.status || 0,
      code: (error.response?.data as any)?.code || 'UNKNOWN_ERROR',
      message:
        (error.response?.data as any)?.message ||
        error.message ||
        'خطای ناشناخته در ارتباط با سرور',
      details: (error.response?.data as any)?.details || null,
    };
    return Promise.reject(normalized);
  }
);
