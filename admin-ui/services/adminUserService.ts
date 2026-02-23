// admin-ui/services/adminUserService.ts

export async function createAdminUser(payload: any, token: string) {
  const response = await fetch("http://127.0.0.1:8000/api/v1/admin/users/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error("❌ Create Admin User Error:", errorData);
    throw new Error(errorData?.detail || "خطا در ایجاد کاربر");
  }

  return await response.json();
}

export async function listAdminUsers(token: string) {
  const response = await fetch("http://127.0.0.1:8000/api/v1/admin/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("خطا در دریافت لیست کاربران");
  }

  return await response.json();
}
