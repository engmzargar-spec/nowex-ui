"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Spinner, Button } from "@nextui-org/react";
import { useThemeContext } from "../../../context/ThemeContext";
import { palette } from "../../../theme/palette";
import Cookies from "js-cookie";
import Link from "next/link";

type AdminUser = {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  position: string;
  employee_id?: string;
  address?: string;
  description?: string;
  is_active: boolean;
  is_locked: boolean;
  login_attempts: number;
  last_login?: string;
  two_factor_enabled: boolean;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
  password_changed_at: string;
};

export default function AdminUserViewPage({ params }: any) {
  const { id } = params;

  const { desktopTheme } = useThemeContext();
  const isDark = desktopTheme === "dark";

  const bg = isDark ? palette.darkcolor14 : palette.lightcolor1;
  const text = isDark ? palette.lightcolor1 : palette.darkcolor5;
  const borderColor = isDark ? palette.lightcolor4 : palette.darkcolor1;

  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const API_ROOT = API_BASE.replace("/api/v1", "");

  useEffect(() => {
    async function loadUser() {
      try {
        const token = Cookies.get("nowex_admin_token");

        const res = await fetch(`${API_BASE}/admin/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Spinner color="warning" label="در حال بارگذاری اطلاعات کاربر..." />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-20 text-red-500 text-lg">
        کاربر یافت نشد
      </div>
    );
  }

  // 🔥 ساخت URL صحیح برای تصویر
  const avatar = user.avatar_url
    ? user.avatar_url.startsWith("/uploads")
      ? `${API_ROOT}${user.avatar_url}`
      : user.avatar_url
    : "/no-avatar.png";

  return (
    <div
      className="max-w-4xl mx-auto mt-10 p-8 rounded-xl shadow-md space-y-6"
      style={{
        backgroundColor: bg,
        color: text,
        border: `3px solid ${borderColor}`,
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">مشاهده اطلاعات کاربر</h1>

        <div className="flex gap-3">
          <Link href="/dashboard/adminusers">
            <Button color="primary" radius="lg">
              بازگشت
            </Button>
          </Link>

          <Link href={`/dashboard/adminusers/${id}/edit`}>
            <Button color="warning" radius="lg">
              ویرایش کاربر
            </Button>
          </Link>
        </div>
      </div>

      {/* Avatar */}
      <div className="flex justify-center">
        <img
          src={avatar}
          alt="avatar"
          style={{
            width: 140,
            height: 140,
            borderRadius: "12px",
            objectFit: "cover",
            border: `3px solid ${borderColor}`,
          }}
        />
      </div>

      {/* Info Card */}
      <Card
        style={{
          backgroundColor: isDark ? palette.darkcolor12 : palette.lightcolor6,
          color: text,
        }}
      >
        <CardHeader className="text-lg font-bold">
          اطلاعات کاربری
        </CardHeader>

        <CardBody className="space-y-4 text-sm">
          <InfoRow label="نام کامل" value={`${user.first_name} ${user.last_name}`} />
          <InfoRow label="نام کاربری" value={user.username} />
          <InfoRow label="ایمیل" value={user.email} />
          <InfoRow label="شماره موبایل" value={user.phone} />
          <InfoRow label="سمت" value={user.position} />
          <InfoRow label="کد پرسنلی" value={user.employee_id || "-"} />
          <InfoRow label="آدرس" value={user.address || "-"} />
          <InfoRow label="توضیحات" value={user.description || "-"} />
        </CardBody>
      </Card>

      {/* Status Card */}
      <Card
        style={{
          backgroundColor: isDark ? palette.darkcolor12 : palette.lightcolor6,
          color: text,
        }}
      >
        <CardHeader className="text-lg font-bold">
          وضعیت و امنیت
        </CardHeader>

        <CardBody className="space-y-4 text-sm">
          <InfoRow label="وضعیت فعال" value={user.is_active ? "فعال" : "غیرفعال"} />
          <InfoRow label="قفل بودن حساب" value={user.is_locked ? "قفل شده" : "باز"} />
          <InfoRow label="تعداد تلاش‌های ورود" value={String(user.login_attempts)} />
          <InfoRow label="آخرین ورود" value={user.last_login || "-"} />
          <InfoRow label="ورود دو مرحله‌ای" value={user.two_factor_enabled ? "فعال" : "غیرفعال"} />
        </CardBody>
      </Card>

      {/* Dates */}
      <Card
        style={{
          backgroundColor: isDark ? palette.darkcolor12 : palette.lightcolor6,
          color: text,
        }}
      >
        <CardHeader className="text-lg font-bold">
          زمان‌ها
        </CardHeader>

        <CardBody className="space-y-4 text-sm">
          <InfoRow label="تاریخ ایجاد" value={user.created_at} />
          <InfoRow label="آخرین بروزرسانی" value={user.updated_at} />
          <InfoRow label="آخرین تغییر رمز" value={user.password_changed_at} />
        </CardBody>
      </Card>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="font-semibold">{label}</span>
      <span>{value}</span>
    </div>
  );
}
