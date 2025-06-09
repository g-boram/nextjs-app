"use client";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

interface CalendarProps {
  selectedDate: Dayjs | null; // 선택될 날짜
  setSelectedDate: (date: Dayjs | null) => void; // 사용될 페이지에 선택된값 전달
  onClickFc?: () => void; // 날짜 클릭후 실행 함수
  beforeDate?: Dayjs | null; // 이전 날짜 (체크인 처럼)
  option?: string; // 옵션값으로 구분
}

const CustomDayJSCalendar = ({ selectedDate, setSelectedDate, onClickFc, option, beforeDate }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startOfMonth = currentDate.startOf("month");
  // const endOfMonth = currentDate.endOf("month");
  const daysInMonth = currentDate.daysInMonth();

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  const renderCalendar = () => {
    const days = [];
    const startDay = startOfMonth.day(); // 요일 (0: 일요일, 1: 월요일, ...)

    // 이전 달의 빈 칸
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="text-gray-400"></div>);
    }

    // 이번 달의 날짜
    for (let day = 1; day <= daysInMonth; day++) {
      const date = startOfMonth.add(day - 1, "day");
      const isDisabled = option === "checkOut" ? (beforeDate ? date.isBefore(beforeDate, "day") : false) : false;

      days.push(
        <button
          key={day}
          onClick={() => {
            if (!isDisabled) setSelectedDate(date);
            setSelectedDate(date);
            onClickFc?.();
          }}
          disabled={isDisabled}
          className={`p-2 w-full text-center rounded-md ${
            isDisabled
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : selectedDate && selectedDate.isSame(date, "day")
              ? "bg-rose-500 text-white"
              : beforeDate && beforeDate.isSame(date, "day")
              ? "bg-rose-200"
              : "hover:bg-gray-100"
          }`}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="w-80 bg-white shadow-lg rounded-lg p-4">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-gray-500 hover:text-black">
          &lt;
        </button>
        <div className="font-semibold text-gray-700">{currentDate.format("YYYY년 MMMM")}</div>
        <button onClick={nextMonth} className="text-gray-500 hover:text-black">
          &gt;
        </button>
      </div>
      {/* 날짜 헤더 */}
      <div className="grid grid-cols-7 text-center text-gray-500 mb-2">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day} className="font-medium">
            {day}
          </div>
        ))}
      </div>
      {/* 날짜 렌더링 */}
      <div className="grid grid-cols-7 gap-1 text-black">{renderCalendar()}</div>
      {/* 선택된 날짜 표시 */}
      {selectedDate && (
        <div className="mt-4 text-center text-gray-500">
          선택된 날짜: {selectedDate ? selectedDate.format("YYYY-MM-DD") : ""}
        </div>
      )}
    </div>
  );
};

export default CustomDayJSCalendar;
