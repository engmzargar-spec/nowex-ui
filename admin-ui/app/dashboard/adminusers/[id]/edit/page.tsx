"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Spinner,
  Textarea,
  Switch,
} from "@nextui-org/react";
import Link from "next/link";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

import { palette } from "../../../../theme/palette";
import { useThemeContext } from "../../../../context/ThemeContext";

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
  two_factor_enabled: boolean;
  avatar_url?: string;
};

export default function EditAdminUserPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const { desktopTheme } = useThemeContext();
  const isDark = desktopTheme === "dark";

  const bg = isDark ? palette.darkcolor14 : palette.lightcolor1;
  const text = isDark ? palette.lightcolor1 : palette.darkcolor5;
  const borderColor = isDark ? palette.lightcolor4 : palette.darkcolor1;

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const API_ROOT = API_BASE.replace("/api/v1", "");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<AdminUser | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [newAvatarBase64, setNewAvatarBase64] = useState<string | null>(null);

  // ------------------------------
  // 📌 Load User Data
  // ------------------------------
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
          toast.error("کاربر یافت نشد");
          return;
        }

        const data: AdminUser = await res.json();
        setForm(data);

        if (data.avatar_url) {
          const avatar = data.avatar_url.startsWith("/uploads")
            ? `${API_ROOT}${data.avatar_url}`
            : data.avatar_url;

          setPreviewImage(avatar);
        }
      } catch {
        toast.error("خطا در دریافت اطلاعات کاربر");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [id]);

  // ------------------------------
  // 📌 آپلود تصویر جدید → Base64
  // ------------------------------
  function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result as string;
      setNewAvatarBase64(base64);
      setPreviewImage(base64);
    };

    reader.readAsDataURL(file);
  }

  // ------------------------------
  // 📌 ذخیره تغییرات
  // ------------------------------
  async function handleSave() {
    if (!form) return;

    setSaving(true);

    try {
      const token = Cookies.get("nowex_admin_token");

      const payload: any = {
        username: form.username,
        email: form.email,
        first_name: form.first_name,
        last_name: form.last_name,
        phone: form.phone,
        position: form.position,
        employee_id: form.employee_id,
        address: form.address,
        description: form.description,
        is_active: form.is_active,
        two_factor_enabled: form.two_factor_enabled,
      };

      if (newAvatarBase64) {
        payload.avatar_url = newAvatarBase64;
      }

      const res = await fetch(`${API_BASE}/admin/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      let data: any = null;
      try {
        data = await res.json();
      } catch {
        // ممکن است پاسخ خالی باشد
      }

      if (!res.ok) {
        toast.error(data?.detail || "خطا در ذخیره تغییرات");
        setSaving(false);
        return;
      }

      toast.success("تغییرات با موفقیت ذخیره شد");
      window.location.href = `/dashboard/adminusers/${id}`;
    } catch {
      toast.error("خطا در ذخیره تغییرات");
    } finally {
      setSaving(false);
    }
  }

  if (loading || !form) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Spinner color="warning" label="در حال بارگذاری اطلاعات..." />
      </div>
    );
  }

  return (
    <div
      className="max-w-3xl mx-auto mt-10 p-8 rounded-xl shadow-md space-y-6"
      style={{
        backgroundColor: bg,
        color: text,
        border: `3px solid ${borderColor}`,
      }}
    >
      <h1 className="text-xl font-bold">ویرایش اطلاعات کاربر</h1>

      {/* Avatar */}
      <div className="flex flex-col items-center gap-3">
        <img
          src={previewImage || "/no-avatar.png"}
          alt="avatar"
          style={{
            width: 140,
            height: 140,
            borderRadius: "12px",
            objectFit: "cover",
            border: `3px solid ${borderColor}`,
          }}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarUpload}
          className="text-sm"
        />
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="نام"
          value={form.first_name}
          onChange={(e) => setForm({ ...form, first_name: e.target.value })}
        />

        <Input
          label="نام خانوادگی"
          value={form.last_name}
          onChange={(e) => setForm({ ...form, last_name: e.target.value })}
        />

        <Input
          label="نام کاربری"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <Input
          label="ایمیل"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <Input
          label="شماره موبایل"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <Input
          label="سمت"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
        />

        <Input
          label="کد پرسنلی"
          value={form.employee_id || ""}
          onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
        />
      </div>

      <Textarea
        label="آدرس"
        value={form.address || ""}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />

      <Textarea
        label="توضیحات"
        value={form.description || ""}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      {/* Switches */}
      <div className="flex gap-6 mt-4">
        <Switch
          isSelected={form.is_active}
          onValueChange={(v) => setForm({ ...form, is_active: v })}
        >
          فعال باشد
        </Switch>

        <Switch
          isSelected={form.two_factor_enabled}
          onValueChange={(v) => setForm({ ...form, two_factor_enabled: v })}
        >
          ورود دو مرحله‌ای
        </Switch>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <Link href={`/dashboard/adminusers/${id}`}>
          <Button color="default" radius="lg">
            بازگشت
          </Button>
        </Link>

        <Button
          color="primary"
          radius="lg"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? <Spinner size="sm" color="white" /> : "ذخیره تغییرات"}
        </Button>
      </div>
    </div>
  );
}
