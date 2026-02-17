"use client";

import { useState } from "react";
import { Select, SelectItem, Button } from "@nextui-org/react";
import { FiSearch } from "react-icons/fi";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import {
  TimePreset,
  TimeRange,
  getDefaultDailyRange,
} from "../services/timeRange";
import { useThemeContext } from "../context/ThemeContext";
import { palette } from "../theme/palette";

interface Props {
  onChange?: (range: TimeRange) => void;
}

export default function TimeRangeSelector({ onChange }: Props) {
  const defaultRange = getDefaultDailyRange();
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);

  const { desktopTheme } = useThemeContext();
  const isDark = desktopTheme === "dark";

  const safeOnChange = onChange || (() => {});

  // 🎨 رنگ ثابت برای dropdown و datepicker
  const dropdownBg = palette.lightcolor2; // سفید
  const dropdownText = palette.darkcolor5; // مشکی
  const dropdownBorder = palette.lightcolor5;

  // 🎨 رنگ‌بندی کانتینر
  const containerBg = isDark ? palette.darkcolor14 : palette.lightcolor1;
  const containerText = isDark ? palette.lightcolor1 : palette.darkcolor3;
  const borderColor = isDark ? palette.darkcolor9 : palette.lightcolor5;

  function handlePreset(val: TimePreset) {
    let range: TimeRange = defaultRange;

    if (val === "threeDays") {
      range = {
        preset: val,
        startJalali: "1404-10-10",
        endJalali: "1404-10-13",
      };
    }
    if (val === "weekly") {
      range = {
        preset: val,
        startJalali: "1404-10-06",
        endJalali: "1404-10-13",
      };
    }
    if (val === "fifteenDays") {
      range = {
        preset: val,
        startJalali: "1404-09-28",
        endJalali: "1404-10-13",
      };
    }
    if (val === "monthly") {
      range = {
        preset: val,
        startJalali: "1404-09-13",
        endJalali: "1404-10-13",
      };
    }

    safeOnChange(range);
  }

  function handleSearch() {
    if (startDate && endDate) {
      const start = startDate.format("YYYY/MM/DD");
      const end = endDate.format("YYYY/MM/DD");
      safeOnChange({ preset: "custom", startJalali: start, endJalali: end });
    }
  }

  return (
    <div
      className="flex items-center gap-4 p-3 rounded-md border-2 shadow-sm"
      style={{
        backgroundColor: containerBg,
        color: containerText,
        borderColor: borderColor,
      }}
    >
      {/* ------------------ Select ------------------ */}
      <Select
        label="انتخاب دوره زمانی"
        defaultSelectedKeys={["daily"]}
        onChange={(e) => handlePreset(e.target.value as TimePreset)}
        renderValue={(items) =>
          items.map((item) => (
            <span
              key={item.key}
              style={{ color: dropdownText, fontWeight: 500 }}
            >
              {item.textValue}
            </span>
          ))
        }
        classNames={{
          trigger: "rounded-md border !bg-white !text-black",
          listbox: "!bg-white !text-black",
          popoverContent: "!bg-white !text-black",
          item: [
            "!text-black",
            "data-[hover=true]:!bg-gray-200",
            "data-[selectable=true]:!text-black",
            "data-[selected=true]:!bg-gray-300",
            "data-[disabled=true]:!text-black !opacity-100",
          ].join(" "),
        }}
        style={{
          width: "12rem",
          backgroundColor: dropdownBg,
          color: dropdownText,
          borderColor: dropdownBorder,
        }}
      >
        <SelectItem key="daily" value="daily" className="!text-black">
          روزانه
        </SelectItem>
        <SelectItem key="threeDays" value="threeDays" className="!text-black">
          سه روزه
        </SelectItem>
        <SelectItem key="weekly" value="weekly" className="!text-black">
          هفتگی
        </SelectItem>
        <SelectItem
          key="fifteenDays"
          value="fifteenDays"
          className="!text-black"
        >
          ۱۵ روزه
        </SelectItem>
        <SelectItem key="monthly" value="monthly" className="!text-black">
          ماهانه
        </SelectItem>
      </Select>

      {/* ------------------ Divider ------------------ */}
      <div
        className="w-px h-8"
        style={{ backgroundColor: borderColor }}
      ></div>

      {/* ------------------ Start Date ------------------ */}
      <div className="flex items-center gap-2">
        <span style={{ color: containerText }}>شروع:</span>
        <DatePicker
          calendar={persian}
          locale={persian_fa}
          value={startDate}
          onChange={setStartDate}
          placeholder="انتخاب"
          className="rounded-md p-2 border"
          style={{
            backgroundColor: dropdownBg,
            color: dropdownText,
            borderColor: dropdownBorder,
          }}
          inputClass="text-black"
          containerStyle={{
            backgroundColor: dropdownBg,
            color: dropdownText,
          }}
        />
      </div>

      {/* ------------------ End Date ------------------ */}
      <div className="flex items-center gap-2">
        <span style={{ color: containerText }}>پایان:</span>
        <DatePicker
          calendar={persian}
          locale={persian_fa}
          value={endDate}
          onChange={setEndDate}
          placeholder="انتخاب"
          className="rounded-md p-2 border"
          style={{
            backgroundColor: dropdownBg,
            color: dropdownText,
            borderColor: dropdownBorder,
          }}
          inputClass="text-black"
          containerStyle={{
            backgroundColor: dropdownBg,
            color: dropdownText,
          }}
        />
      </div>

      {/* ------------------ Search Button ------------------ */}
      <Button
        isIconOnly
        onClick={handleSearch}
        isDisabled={!startDate || !endDate}
        className="ml-2 border-2"
        style={{
          borderColor: borderColor,
          backgroundColor: palette.lightcolor3,
          color: palette.darkcolor5,
        }}
      >
        <FiSearch />
      </Button>
    </div>
  );
}
