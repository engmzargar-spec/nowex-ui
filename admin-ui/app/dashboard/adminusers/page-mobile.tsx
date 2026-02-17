"use client";

import { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import apiClient from "../../services/apiClient";
import { palette } from "../../theme/palette";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function AdminUsersMobile() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await apiClient.get("/users");
        setUsers(res.data.users);
        setFiltered(res.data.users);
      } catch (err) {
        toast.error("خطا در دریافت کاربران");
      }
      setLoading(false);
    }
    loadUsers();
  }, []);

  // جستجو بر اساس نام، نام خانوادگی، نام کاربری، شماره پرسنلی، موبایل و نقش
  useEffect(() => {
    const s = search.toLowerCase();

    const f = users.filter((u) => {
      const fullName = `${u.first_name} ${u.last_name}`.toLowerCase();
      const username = (u.username || "").toLowerCase();
      const employeeId = (u.employee_id || "").toLowerCase();
      const phone = (u.phone || "").toLowerCase();
      const roles = u.roles.map((r) => r.name).join(" ").toLowerCase();

      return (
        fullName.includes(s) ||
        username.includes(s) ||
        employeeId.includes(s) ||
        phone.includes(s) ||
        roles.includes(s)
      );
    });

    setFiltered(f);
  }, [search, users]);

  if (loading) {
    return <div className="p-4 text-center">در حال بارگذاری...</div>;
  }

  return (
    <div className="space-y-4">

      {/* فیلد جستجو */}
      <div className="mt-4">
        <Input
          placeholder="جستجوی کاربر..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          startContent={<MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />}
          className="w-full"
          radius="lg"
          size="lg"
          style={{
            backgroundColor: palette.lightcolor2,
          }}
        />
      </div>

      {/* لیست کاربران */}
      <div className="space-y-4">
        {filtered.map((user: any) => (
          <div
            key={user.id}
            className="p-4 rounded-xl shadow-md border"
            style={{ borderColor: palette.lightcolor4 }}
          >
            <div className="font-bold text-base">
              {user.first_name} {user.last_name}
            </div>

            <div className="text-sm mt-1 text-gray-500">
              نام کاربری: {user.username}
            </div>

            <div className="text-sm mt-1 text-gray-500">
              شماره موبایل: {user.phone || "-"}
            </div>

            <div className="text-sm mt-1 text-gray-500">
              کد پرسنلی: {user.employee_id || "-"}
            </div>
              
            <div className="text-sm mt-1 text-gray-500">
              نقش‌ها: {user.roles.map((r: any) => r.name).join("، ")}
            </div>

            <div className="flex gap-2 mt-4">
              <Link href={`/dashboard/adminusers/${user.id}`}>
                <Button size="sm" color="primary" className="flex-1">
                  مشاهده
                </Button>
              </Link>

              <Link href={`/dashboard/adminusers/${user.id}/edit`}>
                <Button size="sm" color="warning" className="flex-1">
                  ویرایش
                </Button>
              </Link>

              <Button
                size="sm"
                color="danger"
                className="flex-1"
                onClick={() => toast.error("حذف از موبایل فعلاً غیرفعال است")}
              >
                حذف
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
