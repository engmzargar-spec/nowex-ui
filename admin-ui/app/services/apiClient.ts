// admin-ui/services/apiClient.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// اضافه کردن توکن به همه درخواست‌ها
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("nowex_admin_token");

    console.log("🔥 TOKEN SENT IN REQUEST:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// مدیریت خطاهای عمومی
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
      console.warn("❌ Authentication error — redirecting to login");

      if (typeof window !== "undefined") {
        localStorage.removeItem("nowex_admin_token");
        document.cookie =
          "nowex_admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
