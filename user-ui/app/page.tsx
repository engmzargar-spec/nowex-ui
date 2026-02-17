import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-neutral-950 text-white pt-16 px-4">
      {/* لوگو بالا و وسط */}
      <div className="mb-20">
        <Image
          src="/logoforlight.png"
          alt="NOWEX Logo"
          width={340}
          height={140}
          priority
        />
      </div>

      {/* تصویر مرکزی */}
      <div className="mb-8">
        <Image
          src="/under-construction.png"
          alt="Under Construction"
          width={720}
          height={720}
          priority
        />
      </div>

      {/* متن زیر تصویر */}
      <p className="text-center text-gray-400 text-sm max-w-md">
        صفحه در دست احداث است. به زودی تجربه‌ای حرفه‌ای در اختیار شما خواهد بود.
      </p>
    </main>
  );
}
