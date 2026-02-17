"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    const ua = navigator.userAgent;

    // تشخیص تلویزیون‌ها
    const isTV = /TV|SmartTV|Tizen|WebTV|NetCast|HbbTV|MiBOX|AFTT|BRAVIA|AppleTV/i.test(ua);

    // تشخیص موبایل واقعی (نه تبلت، نه TV، نه Android Box)
    const isMobile =
      !isTV &&
      (
        (/Android/i.test(ua) && /Mobile/i.test(ua)) || // فقط Android + Mobile = موبایل واقعی
        /iPhone|iPod|Opera Mini|IEMobile/i.test(ua)
      );

    // تبلت‌ها (iPad و Android Tablet)
    const isTablet =
      !isTV &&
      (
        /iPad/i.test(ua) ||
        (/Android/i.test(ua) && !/Mobile/i.test(ua)) // Android بدون Mobile = تبلت یا TV یا Box
      );

    // اندروید باکس‌ها (MiBOX, AFTT, FireTV, Android TV)
    const isAndroidBox =
      /MiBOX|AFTT|AFTM|AFTA|BRAVIA|Shield|Android TV|GoogleTV/i.test(ua);

    // تصمیم نهایی
    if (isMobile) {
      router.replace("/mobile/login");
    } else {
      // دسکتاپ، تبلت، TV، Android Box → نسخهٔ دسکتاپ
      router.replace("/login");
    }
  }, [router]);

  return null;
}
