import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* سایدبار */}
      <Sidebar />

      {/* بخش اصلی داشبورد */}
      <div className="flex flex-col flex-1">
        {/* هدر */}
        <Header />

        {/* محتوای اصلی */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
