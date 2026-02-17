# NOWEX-UI

![CI/CD for NOWEX-UI](https://github.com/engmzargar-spec/nowex-ui/actions/workflows/cicd.yml/badge.svg)

این پروژه رابط کاربری (Frontend) سیستم NOWEX است که با [Next.js](https://nextjs.org) ساخته شده و از [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) راه‌اندازی شده است.

---

## 🚀 Getting Started

برای اجرای محیط توسعه:

```bash
npm run dev
# یا
yarn dev
# یا
pnpm dev
# یا
bun dev
```

🛠️ Development Notes
فایل اصلی صفحه در مسیر app/page.tsx قرار دارد.

تغییرات در این فایل به‌صورت خودکار در مرورگر به‌روزرسانی می‌شوند.

این پروژه از next/font برای مدیریت فونت‌ها استفاده می‌کند.

📦 Scripts
npm run dev → اجرای محیط توسعه

npm run build → ساخت پروژه برای انتشار

npm run start → اجرای نسخهٔ ساخته‌شده

npm run lint → بررسی کد با ESLint

📚 Learn More
برای یادگیری بیشتر درباره Next.js:

Next.js Documentation

Learn Next.js

🔄 CI/CD
این ریپو دارای سیستم CI/CD ساده با GitHub Actions است که روی هر push یا pull request به شاخهٔ main اجرا می‌شود و مراحل زیر را بررسی می‌کند:

نصب وابستگی‌ها

اجرای lint

اجرای تست‌ها

ساخت پروژه

وضعیت آخرین اجرای CI/CD در Badge بالای این فایل نمایش داده می‌شود.

---

🎯 حالا README خیلی تمیزتر و حرفه‌ای‌تر شده، هم Badge CI/CD رو نشون می‌ده، هم دستورهای اصلی پروژه رو.

می‌خوای من یک **بخش Contribution** هم اضافه کنم (برای راهنمایی تیم یا همکارها که چطور Pull Request بدن و کد رو تست کنن)؟

تغیرات 1404/11/27
NOWEX-UI — Admin Panel Frontend
رابط کاربری پنل مدیریت NOWEX، ساخته‌شده با Next.js (App Router) و طراحی‌شده برای یک تجربهٔ سریع، امن و مقیاس‌پذیر.

🚀 تغییرات مهم اخیر (Changelog)
🔧 ۱) ارتقای نسخهٔ Python در بک‌اند
ارتقا از Python 3.9 → Python 3.11.9

نصب نسخهٔ جدید بدون حذف نسخهٔ قبلی (برای rollback امن)

ساخت venv جدید و تست کامل پروژه روی نسخهٔ جدید

بهبود سرعت اجرای FastAPI و کاهش مصرف حافظه

🔐 ۲) مهاجرت کامل سیستم احراز هویت به Argon2
جایگزینی bcrypt با argon2id

افزایش امنیت ذخیره‌سازی رمز عبور

به‌روزرسانی مدل‌ها، سرویس‌ها و dependencyهای امنیتی

تست کامل login / logout / token validation

سازگاری کامل با سیستم blacklist توکن

🛠 ۳) اصلاح ساختار API و مسیرهای جدید
استانداردسازی مسیرها تحت /api/v1

رفع مشکل دوبل شدن مسیر (/api/v1/api/v1/...)

هماهنگ‌سازی کامل فرانت‌اند با ساختار جدید

افزودن مسیرهای جدید برای مدیریت کاربران ادمین

🌐 ۴) اصلاح کامل apiClient در فرانت‌اند
قبل:  
baseURL شامل /api/v1 بود و باعث دوبل شدن مسیر می‌شد.

بعد:

ts
baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
و endpointها به شکل زیر اصلاح شدند:

ts
/api/v1/admin/users
📱 ۵) بازنویسی AdminUsersSwitcher
جلوگیری از SSR mismatch

اجرای Switcher فقط در Client

افزودن fallback برای جلوگیری از رندر null

رفع مشکل mount نشدن صفحهٔ دسکتاپ

فعال شدن کامل useEffect و API calls

🖥 ۶) بازسازی صفحهٔ «کلیه کاربران»
هماهنگ‌سازی کامل با API جدید

رفع باگ عدم نمایش کاربران

بهبود فیلترها (search, role, status)

بهبود UX و رنگ‌بندی بر اساس ThemeContext

رفع مشکل import اشتباه از apiFacade

🧹 ۷) پاک‌سازی ساختار پروژه
حذف importهای اشتباه

یکپارچه‌سازی مسیرهای service

استانداردسازی نام فایل‌ها

بهبود ساختار فولدر adminusers

🧪 اجرای پروژه (Development)
bash
npm run dev

# یا

yarn dev
📦 Scripts
دستور توضیح
npm run dev اجرای محیط توسعه
npm run build ساخت نسخهٔ production
npm run start اجرای نسخهٔ ساخته‌شده
npm run lint بررسی کیفیت کد
🧩 ساختار پروژه (مهم‌ترین مسیرها)
Code
app/
├── dashboard/
│ └── adminusers/
│ ├── page.tsx
│ ├── page-desktop.tsx
│ ├── page-mobile.tsx
│ ├── AdminUsersSwitcher.tsx
│ └── create/
└── services/
├── apiClient.ts
├── adminUserService.ts
└── ...
🔒 امنیت
استفاده از Argon2id برای رمز عبور

اعتبارسنجی توکن در هر درخواست

سیستم blacklist برای logout

حذف توکن از localStorage در صورت 401/403

جلوگیری از SSR token leakage

🔄 CI/CD
این ریپو دارای CI/CD با GitHub Actions است که روی هر push به main اجرا می‌شود:

نصب وابستگی‌ها

اجرای lint

اجرای تست‌ها

build پروژه

Badge وضعیت CI/CD در بالای README قرار دارد.

📌 مسیرهای آینده (Next Steps)
بازبینی کامل صفحهٔ ایجاد کاربر ادمین

هماهنگ‌سازی فرم‌ها با ساختار جدید API

افزودن pagination به لیست کاربران

افزودن audit log در فرانت‌اند

بهبود UX برای موبایل

اضافه کردن تست‌های E2E
