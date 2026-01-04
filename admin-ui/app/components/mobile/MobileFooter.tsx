"use client";

import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import { palette } from "../../theme/palette";

export default function MobileFooter() {
  return (
    <footer
      className="px-4 py-3 border-t flex justify-center"
      style={{ backgroundColor: palette.darkcolor1, color: palette.lightcolor1 }}
    >
      <Button variant="light" size="sm">
        <Cog6ToothIcon className="w-5 h-5 mr-1" />
        تنظیمات
      </Button>
    </footer>
  );
}
