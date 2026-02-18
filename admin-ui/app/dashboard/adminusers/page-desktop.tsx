"use client";

import { useEffect, useState } from "react";
import { Button, Input, Spinner } from "@nextui-org/react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Select, SelectItem } from "@heroui/react";

import { palette } from "../../theme/palette";
import { useThemeContext } from "../../context/ThemeContext";

// -----------------------------
// 📌 مدل هماهنگ با بک‌اند NOWEX
// -----------------------------
type AdminUser = {
  id: string;
  username: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
};

type AdminUserListResponse = {
  users: AdminUser[];
  total_count: number;
  skip: number;
  limit: number;
};

export default function AdminUsersDesktop() {
  const { desktopTheme } = useThemeContext();
  const isDark = desktopTheme === "dark";

  const bg = isDark ? palette.darkcolor14 : palette.lightcolor1;
  const text = isDark ? palette.lightcolor1 : palette.darkcolor5;
  const borderColor = isDark ? palette.lightcolor4 : palette.darkcolor1;
  const headerBg = palette.darkcolor17;
  const headerText = palette.lightcolor1;
  const tableStripe = isDark ? palette.darkcolor16 : palette.lightcolor6;
  const brand = isDark ? palette.darkcolor16 : palette.lightcolor16;

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [totalCount, setTotalCount] = useState<number>(0);

  // -----------------------------
  // 📌 لود کاربران از API داخلی Next.js
  // -----------------------------
  useEffect(() => {
    async function loadUsers() {
      setLoadingUsers(true);
      try {
        const params = new URLSearchParams();

        if (search.trim()) params.append("search", search.trim());
        if (selectedStatus !== "all")
          params.append("is_active", selectedStatus === "active" ? "true" : "false");
        if (selectedRole !== "all") params.append("role", selectedRole);

        const query = params.toString();

        const url = query
          ? `/api/v1/adminusers/list?${query}`
          : `/api/v1/adminusers/list`;

        const res = await fetch(url, { cache: "no-store" });

        if (!res.ok) {
          toast.error("خطا در دریافت اطلاعات کاربران");
          return;
        }

        const data: AdminUserListResponse = await res.json();

        setUsers(data.users);
        setTotalCount(data.total_count);
      } catch (err) {
        toast.error("خطا در دریافت اطلاعات کاربران");
      } finally {
        setLoadingUsers(false);
        setLoading(false);
      }
    }

    loadUsers();
  }, [search, selectedRole, selectedStatus]);

  // -----------------------------
  // 📌 حذف کاربر (مستقیم به بک‌اند)
  // -----------------------------
  async function handleDelete(id: string) {
    if (!confirm("آیا از حذف این کاربر مطمئن هستید؟")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/users/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        toast.error("خطا در حذف کاربر");
        return;
      }

      setUsers((prev) => prev.filter((u) => u.id !== id));
      setTotalCount((prev) => prev - 1);
      toast.success("کاربر حذف شد");
    } catch {
      toast.error("خطا در حذف کاربر");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Spinner color="warning" label="در حال آماده‌سازی صفحه کاربران..." />
      </div>
    );
  }

  return (
    <div
      className="p-8 rounded-xl shadow-md max-w-6xl mx-auto mt-10 space-y-6"
      style={{
        backgroundColor: bg,
        color: text,
        border: `3px solid ${borderColor}`,
        borderRadius: "20px",
      }}
    >
      {/* هدر */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold mb-1">کلیه کاربران ادمین</h1>
          <p className="text-sm opacity-80">
            مدیریت کاربران، نقش‌ها و وضعیت دسترسی در پنل ادمین NOWEX
          </p>
          <p className="text-xs mt-1 opacity-70">
            تعداد کل کاربران: <span className="font-bold">{totalCount}</span>
          </p>
        </div>

        <Link href="/dashboard/adminusers/create">
          <Button
            radius="lg"
            style={{
              backgroundColor: brand,
              color: palette.darkcolor16,
            }}
          >
            ایجاد کاربر جدید
          </Button>
        </Link>
      </div>

      {/* فیلترها */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        {/* جستجو */}
        <div className="col-span-1">
          <p className="text-sm mb-1" style={{ color: text }}>
            جستجو
          </p>
          <Input
            placeholder="نام، نام کاربری، ایمیل..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            radius="lg"
            size="md"
            startContent={<MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />}
            classNames={{ inputWrapper: "bg-transparent" }}
            style={{
              backgroundColor: isDark ? palette.darkcolor6 : palette.lightcolor6,
              color: text,
            }}
          />
        </div>

        {/* نقش */}
        <div className="col-span-1">
          <p className="text-sm mb-1" style={{ color: text }}>
            نقش
          </p>

          <Select
            placeholder="انتخاب نقش"
            selectedKeys={[selectedRole]}
            onSelectionChange={(keys) => setSelectedRole(Array.from(keys)[0])}
            className="w-full"
          >
            <SelectItem key="all">همه نقش‌ها</SelectItem>
            <SelectItem key="superadmin">مدیر ارشد</SelectItem>
            <SelectItem key="support_agent">پشتیبان</SelectItem>
            <SelectItem key="compliance_officer">افسر تطبیق</SelectItem>
            <SelectItem key="risk_manager">مدیر ریسک</SelectItem>
            <SelectItem key="financial_operator">اپراتور مالی</SelectItem>
          </Select>
        </div>

        {/* وضعیت */}
        <div className="col-span-1">
          <p className="text-sm mb-1" style={{ color: text }}>
            وضعیت
          </p>

          <Select
            placeholder="انتخاب وضعیت"
            selectedKeys={[selectedStatus]}
            onSelectionChange={(keys) => setSelectedStatus(Array.from(keys)[0])}
            className="w-full"
          >
            <SelectItem key="all">همه وضعیت‌ها</SelectItem>
            <SelectItem key="active">فقط فعال</SelectItem>
            <SelectItem key="inactive">فقط غیرفعال</SelectItem>
          </Select>
        </div>
      </div>

      {/* جدول */}
      <div
        className="relative overflow-x-auto rounded-xl border"
        style={{ borderColor }}
      >
        {loadingUsers && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
            <Spinner color="warning" label="در حال بارگذاری کاربران..." />
          </div>
        )}

        <table className="w-full border-collapse text-sm">
          <thead>
            <tr
              style={{
                backgroundColor: headerBg,
                color: headerText,
              }}
            >
              <th className="p-3 border">نام کامل</th>
              <th className="p-3 border">نقش</th>
              <th className="p-3 border">نام کاربری</th>
              <th className="p-3 border">ایمیل</th>
              <th className="p-3 border">وضعیت</th>
              <th className="p-3 border">عملیات</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 && !loadingUsers && (
              <tr>
                <td colSpan={6} className="p-6 text-center opacity-70">
                  هیچ کاربری با این فیلترها یافت نشد.
                </td>
              </tr>
            )}

            {users.map((user, index) => (
              <tr
                key={user.id}
                className="text-center"
                style={{
                  backgroundColor:
                    index % 2 === 0 ? "transparent" : tableStripe,
                }}
              >
                <td className="p-3 border">{user.full_name}</td>
                <td className="p-3 border">{user.role}</td>
                <td className="p-3 border">{user.username}</td>
                <td className="p-3 border">{user.email}</td>

                <td className="p-3 border">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: user.is_active
                        ? (isDark ? palette.darkcolor16 : palette.lightcolor16)
                        : (isDark ? palette.darkcolor6 : palette.lightcolor5),
                      color: user.is_active
                        ? palette.lightcolor1
                        : (isDark ? palette.lightcolor1 : palette.darkcolor5),
                    }}
                  >
                    {user.is_active ? "فعال" : "غیرفعال"}
                  </span>
                </td>

                <td className="p-3 border">
                  <div className="flex justify-center gap-3">
                    <Link href={`/dashboard/adminusers/${user.id}`}>
                      <Button size="sm" color="primary" radius="lg">
                        مشاهده
                      </Button>
                    </Link>

                    <Link href={`/dashboard/adminusers/${user.id}/edit`}>
                      <Button size="sm" color="warning" radius="lg">
                        ویرایش
                      </Button>
                    </Link>

                    <Button
                      size="sm"
                      color="danger"
                      radius="lg"
                      onClick={() => handleDelete(user.id)}
                    >
                      حذف
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
