"use client";
// import React, { useState } from "react";

import Calendar from "react-calendar";
import styles from "./CustomReactCalendarStyles.module.css";
import dayjs from "dayjs";

// import "node_modules/react-calendar/dist/Calendar.css";

interface ReactCalendarProps {
  title?: string; // 달력이름
  desc?: string; // 설명
  direction?: string; // 헤더 정렬방향
  defaultDate?: Date | string; // 기본 날짜값
}

// ----------------------
//    @TODO: 미완성 파일
//
//    + 테마별 CSS 만들기
// ----------------------

const CustomReactCalendar = ({
  title = "Calendar",
  desc = "",
  direction = "row",
  defaultDate = "",
}: ReactCalendarProps) => {
  // const [defaultValue, setDefaultValue] = useState<Date | string>();

  // const onChange = (e: any) => {};

  return (
    <div>
      {/* **** 헤더 영역 **** */}
      <div className={`${direction === "row" ? styles.header_row : styles.header_col}`}>
        <div>{title}</div>
        <div>{desc}</div>
      </div>

      {/* **** 캘린더 영역 **** */}
      <Calendar
        className={`${styles.react_calendar}`}
        // onChange={onChange}
        minDate={new Date()}
        defaultValue={defaultDate ? dayjs(defaultDate).format("YYYY-MM-DD") : null}
        formatDay={(locale, date) => dayjs(date).format("DD")}
      />
    </div>
  );
};

export default CustomReactCalendar;
