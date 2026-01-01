import { redirect } from "next/navigation";

export default function Home() {
  // وقتی صفحه اصلی اجرا بشه، مستقیم به /login ریدایرکت می‌کنه
  redirect("/login");
}
