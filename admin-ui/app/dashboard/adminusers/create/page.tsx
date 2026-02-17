"use client";

import { useState, useEffect } from "react";
import {
  Input,
  Button,
  Select,
  SelectItem,
  Switch,
  Textarea,
} from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { palette } from "../../../theme/palette";
import { useThemeContext } from "../../../context/ThemeContext";
import Link from "next/link";

import { createAdminUser, getAdminRoles } from "../../../services/adminUserService";

export default function CreateAdminUserPage() {
  // ------------------------------
  //  Theme Detection
  // ------------------------------
  const { desktopTheme } = useThemeContext();
  const isDark = desktopTheme === "dark";

  // ------------------------------
  //  Colors from Palette
  // ------------------------------
  const bg = isDark ? palette.darkcolor14 : palette.lightcolor1;
  const text = isDark ? palette.lightcolor1 : palette.darkcolor5;
  const borderColor = isDark ? palette.lightcolor4 : palette.darkcolor1;
  const inputBg = isDark ? palette.darkcolor12 : palette.lightcolor2;

  // ------------------------------
  //  Hydration Flag
  // ------------------------------
  const [hydrated, setHydrated] = useState(false);

  // ------------------------------
  //  Avatar
  // ------------------------------
  const [avatar, setAvatar] = useState<string | null>(null);

  // ------------------------------
  //  Roles from backend
  // ------------------------------
  const [roles, setRoles] = useState<any[]>([]);
  const [selectedRoleIds, setSelectedRoleIds] = useState<number[]>([]);

  // ------------------------------
  //  Form State
  // ------------------------------
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
    employee_id: "",
    address: "",
    is_active: true,
    two_factor_enabled: false,
  });

  // ------------------------------
  //  Hydration Effect
  // ------------------------------
  useEffect(() => {
    setHydrated(true);
  }, []);

  // ------------------------------
  //  Load roles from backend
  // ------------------------------
  useEffect(() => {
    async function loadRoles() {
      try {
        const data = await getAdminRoles();
        setRoles(data);
      } catch (err) {
        toast.error("خطا در دریافت نقش‌ها");
      }
    }
    loadRoles();
  }, []);

  // ------------------------------
  //  Prevent Rendering Before Hydration
  // ------------------------------
  if (!hydrated) {
    return <div className="p-8 max-w-3xl mx-auto mt-10">در حال بارگذاری...</div>;
  }

  // ------------------------------
  //  Submit Handler
  // ------------------------------
  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!form.username || !form.email || !form.password) {
      toast.error("لطفاً فیلدهای ضروری را تکمیل کنید");
      return;
    }

    const payload = {
      ...form,
      avatar_url: avatar,
      role_ids: selectedRoleIds,
    };

    try {
      await createAdminUser(payload);
      toast.success("کاربر با موفقیت ایجاد شد");
    } catch (err: any) {
      toast.error(err?.response?.data?.detail || "خطا در ثبت اطلاعات");
    }
  };

  // ------------------------------
  //  UI Rendering
  // ------------------------------
  return (
    <div
      className="p-8 rounded-xl shadow-md max-w-3xl mx-auto mt-10"
      style={{
        backgroundColor: bg,
        color: text,
        border: `3px solid ${borderColor}`,
        borderRadius: "20px",
      }}
    >
      {/* Back Button */}
      <div className="flex justify-end mb-4">
        <Link href="/dashboard">
          <Button
            style={{
              backgroundColor: palette.lightcolor3,
              color: palette.darkcolor5,
            }}
          >
            بازگشت به داشبورد
          </Button>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">ایجاد کاربر ادمین جدید</h1>

      {/* Avatar */}
      <div className="flex flex-col items-center mb-8">
        <div
          style={{
            width: 140,
            height: 140,
            backgroundColor: palette.lightcolor2,
            borderRadius: "24px",
            overflow: "hidden",
            border: `2px solid ${palette.lightcolor14}`,
          }}
        >
          {avatar ? (
            <img
              src={avatar}
              alt="avatar"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              بدون تصویر
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => setAvatar(reader.result as string);
                reader.readAsDataURL(file);
              }
            }}
          />
          {avatar && (
            <Button
              style={{
                backgroundColor: palette.darkcolor10,
                color: palette.lightcolor1,
              }}
              onClick={() => setAvatar(null)}
            >
              حذف تصویر
            </Button>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-2 gap-6">
        <Input
          label="ایمیل"
          type="email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          style={{ backgroundColor: inputBg }}
        />

        <Input
          label="نام کاربری"
          value={form.username}
          onChange={(e) => handleChange("username", e.target.value)}
          style={{ backgroundColor: inputBg }}
        />

        <Input
          label="رمز عبور"
          type="password"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
          style={{ backgroundColor: inputBg }}
        />

        <Input
          label="نام"
          value={form.first_name}
          onChange={(e) => handleChange("first_name", e.target.value)}
          style={{ backgroundColor: inputBg }}
        />

        <Input
          label="نام خانوادگی"
          value={form.last_name}
          onChange={(e) => handleChange("last_name", e.target.value)}
          style={{ backgroundColor: inputBg }}
        />

        <Input
          label="شماره موبایل"
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          style={{ backgroundColor: inputBg }}
        />

        <Input
          label="کد پرسنلی"
          value={form.employee_id}
          onChange={(e) => handleChange("employee_id", e.target.value)}
          style={{ backgroundColor: inputBg }}
        />

        {/* Role Select */}
        <Select
          label="نقش کاربر"
          placeholder="انتخاب کنید"
          selectedKeys={selectedRoleIds.map(String)}
          onChange={(e) => {
            const id = Number(e.target.value);
            setSelectedRoleIds([id]);
          }}
        >
          {roles.map((role) => (
            <SelectItem key={role.id}>{role.name}</SelectItem>
          ))}
        </Select>

        <div className="flex items-center gap-3 mt-4">
          <Switch
            isSelected={form.is_active}
            onValueChange={(v) => handleChange("is_active", v)}
          />
          <span>فعال باشد</span>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <Switch
            isSelected={form.two_factor_enabled}
            onValueChange={(v) => handleChange("two_factor_enabled", v)}
          />
          <span>فعال‌سازی ورود دو مرحله‌ای (2FA)</span>
        </div>
      </div>

      {/* Address */}
      <div className="mt-6">
        <Textarea
          label="آدرس"
          value={form.address}
          onChange={(e) => handleChange("address", e.target.value)}
          style={{ backgroundColor: inputBg }}
        />
      </div>

      {/* Submit */}
      <Button
        className="mt-8 w-full py-6 text-lg font-bold"
        onClick={handleSubmit}
        style={{
          backgroundColor: palette.darkcolor15,
          color: palette.lightcolor1,
        }}
      >
        ثبت اطلاعات
      </Button>
    </div>
  );
}
