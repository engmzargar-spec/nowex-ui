import apiClient from "./apiClient";
import { z } from "zod";

const LoginResponseSchema = z.object({
  token: z.string(),
  user: z.object({
    id: z.string(),
    email: z.string().email(),
  }),
});

export async function login(email: string, password: string) {
  const response = await apiClient.post("/auth/login", { email, password });
  const parsed = LoginResponseSchema.parse(response.data);
  localStorage.setItem("token", parsed.token);
  return parsed;
}

export function logout() {
  localStorage.removeItem("token");
}
