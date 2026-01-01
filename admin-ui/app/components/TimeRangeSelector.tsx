"use client";
import { useState } from "react";
import { Select, SelectItem, Button } from "@nextui-org/react";
import { FiSearch } from "react-icons/fi";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import { TimePreset, TimeRange, getDefaultDailyRange } from "../services/timeRange";

interface Props {
  onChange: (range: TimeRange) => void;
}

export default function TimeRangeSelector({ onChange }: Props) {
  const defaultRange = getDefaultDailyRange();
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);

  function handlePreset(val: TimePreset) {
    let range: TimeRange = defaultRange;
    if (val === "threeDays") {
      range = { preset: val, startJalali: "1404-10-10", endJalali: "1404-10-13" };
    }
    if (val === "weekly") {
      range = { preset: val, startJalali: "1404-10-06", endJalali: "1404-10-13" };
    }
    if (val === "fifteenDays") {
      range = { preset: val, startJalali: "1404-09-28", endJalali: "1404-10-13" };
    }
    if (val === "monthly") {
      range = { preset: val, startJalali: "1404-09-13", endJalali: "1404-10-13" };
    }
    onChange(range);
  }

  function handleSearch() {
    if (startDate && endDate) {
      const start = startDate.format("YYYY/MM/DD");
      const end = endDate.format("YYYY/MM/DD");
      onChange({ preset: "custom", startJalali: start, endJalali: end });
    }
  }

  return (
    <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-md">
      {/* منوی کشویی بازه‌های آماده */}
      <Select
        label="بازه آماده"
        defaultSelectedKeys={["daily"]}
        onChange={(e) => handlePreset(e.target.value as TimePreset)}
        classNames={{
          trigger: "bg-white text-black",
          listbox: "bg-white text-black",
          popoverContent: "bg-white text-black"
        }}
        className="w-40"
      >
        <SelectItem key="daily" value="daily" className="text-black">روزانه</SelectItem>
        <SelectItem key="threeDays" value="threeDays" className="text-black">سه روزه</SelectItem>
        <SelectItem key="weekly" value="weekly" className="text-black">هفتگی</SelectItem>
        <SelectItem key="fifteenDays" value="fifteenDays" className="text-black">۱۵ روزه</SelectItem>
        <SelectItem key="monthly" value="monthly" className="text-black">ماهانه</SelectItem>
      </Select>

      {/* خط جداکننده عمودی */}
      <div className="w-px h-8 bg-gray-300"></div>

      {/* فیلد تاریخ شروع */}
      <div className="flex items-center gap-2">
        <span className="text-black">شروع:</span>
        <DatePicker
          calendar={persian}
          locale={persian_fa}
          value={startDate}
          onChange={setStartDate}
          placeholder="انتخاب"
          className="bg-white text-black rounded-md p-2"
          inputClass="text-black"
        />
      </div>

      {/* فیلد تاریخ پایان */}
      <div className="flex items-center gap-2">
        <span className="text-black">پایان:</span>
        <DatePicker
          calendar={persian}
          locale={persian_fa}
          value={endDate}
          onChange={setEndDate}
          placeholder="انتخاب"
          className="bg-white text-black rounded-md p-2"
          inputClass="text-black"
        />
      </div>

      {/* دکمه جستجو با آیکن ذره‌بین */}
      <Button
        isIconOnly
        color="primary"
        onClick={handleSearch}
        isDisabled={!startDate || !endDate}
        className="ml-2"
      >
        <FiSearch />
      </Button>
    </div>
  );
}
