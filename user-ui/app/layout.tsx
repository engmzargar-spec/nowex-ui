import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NOWEX | صفحه در دست احداث",
  description: "به زودی تجربه‌ای حرفه‌ای در اختیار شما خواهد بود.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${inter.className} bg-neutral-950 text-white`}>{children}</body>
    </html>
  );
}
