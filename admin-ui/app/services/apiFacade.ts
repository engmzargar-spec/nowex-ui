// app/services/apiFacade.ts

const BASE_URL = "http://localhost:8000/api/v1";

export const api = {
  // -----------------------------
  // 🔐 Login
  // -----------------------------
  login: async (username: string, password: string) => {
    const res = await fetch(`${BASE_URL}/admin/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      throw new Error("Invalid credentials");
    }

    return res.json();
  },

  // -----------------------------
  // 🔐 Get Current Admin
  // -----------------------------
  getCurrentAdmin: async (token: string) => {
    const res = await fetch(`${BASE_URL}/admin/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Unauthorized");
    }

    return res.json();
  },

  // -----------------------------
  // 🔐 Logout
  // -----------------------------
  logout: async (token: string) => {
    const res = await fetch(`${BASE_URL}/admin/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.json();
  },
};
