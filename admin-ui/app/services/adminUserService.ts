import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const adminUserService = {
  async listUsers() {
    const token = cookies().get("nowex_admin_token")?.value;

    if (!token) {
      throw new Error("Not authenticated");
    }

    const res = await fetch(
      `${BASE_URL}/api/v1/admin/users/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    return res.json();
  },
};
