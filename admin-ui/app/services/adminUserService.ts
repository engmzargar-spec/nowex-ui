const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// برای دیباگ — ببینیم BASE_URL واقعاً چی هست
console.log("BASE_URL =", BASE_URL);

// ------------------------------
//  Create Admin User
// ------------------------------
export async function createAdminUser(data: any, token: string) {
  try {
    const res = await fetch(`${BASE_URL}/admin/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    let errorBody = null;

    if (!res.ok) {
      try {
        errorBody = await res.json();
      } catch (_) {}

      const message =
        errorBody?.detail ||
        errorBody?.message ||
        "خطا در ایجاد کاربر";

      throw new Error(message);
    }

    return res.json();

  } catch (err: any) {
    throw new Error(err.message || "خطای ارتباط با سرور");
  }
}
