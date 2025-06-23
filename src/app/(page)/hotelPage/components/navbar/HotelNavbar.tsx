"use client";

import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

import "dayjs/locale/ko";
import {
  AiOutlineMenu,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
  AiOutlineSearch,
  AiOutlineUser,
} from "react-icons/ai";
import { RxDividerVertical } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";

import CustomDayJSCalendar from "@/components/(Calendar)/CustomDayJSCalendar";
import { DetailFilterType, FilterProps } from "../../interface";

const userMenus = [
  { id: 1, title: "로그인", url: "/users/login" },
  { id: 2, title: "회원가입", url: "/users/signup" },
  { id: 3, title: "FAQ", url: "/users/faqs" },
];

export default function HotelNavbar() {
  // 서브 네비바 활성화 상태값
  const [showUserMenu, setShowUserMenu] = useState(false); // 유저 토글 상태값
  const [checkInDate, setCheckInDate] = useState<Dayjs | null>(null); // 체크인 날짜
  const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(null); // 체크아웃 날짜

  // 필터링 상태값
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [detailFilter, setDetailFilter] = useState<null | DetailFilterType>(null);
  const [filterValue, setFilterValue] = useState<FilterProps>({
    category: "",
    location: "",
    checkIn: "",
    checkOut: "",
    guest: 0,
  });

  const router = useRouter();

  const moveCheckOut = () => {
    setDetailFilter("checkOut");
  };
  const moveGuest = () => {
    setDetailFilter("guest");
  };

  // 체크인 달력
  const CheckInFilter = () => {
    return (
      <>
        <div className="text-sm font-semibold text-black">체크인 날짜 설정하기</div>
        <CustomDayJSCalendar
          selectedDate={dayjs(checkInDate)}
          setSelectedDate={setCheckInDate}
          onClickFc={moveCheckOut}
        />
      </>
    );
  };
  // 체크아웃 달력 (체크인 날짜 전달)
  const CheckOutFilter = () => {
    return (
      <>
        <div className="text-sm font-semibold text-black">체크인 날짜 설정하기</div>
        <CustomDayJSCalendar
          selectedDate={dayjs(checkOutDate)}
          setSelectedDate={setCheckOutDate}
          onClickFc={moveGuest}
          beforeDate={checkInDate}
          option="checkOut"
        />
      </>
    );
  };

  return (
    <nav className={"relative z-10 w-full shadow-sm text-white bg-black ${menu && pb-5}"}>
      {/****** 메뉴이동 행 *****/}
      <div className="flex justify-center items-center w-full p-5 flex-wrap gap-3">
        {/* 텍스트 && 메뉴 && 유저 토글영역 행 */}
        <div className="flex justify-between items-center w-full p-2 flex-wrap gap-3">
          <div>test</div>
          {/* user Btn */}
          <div className="flex gap-4 my-auto relative">
            <button type="button" className="font-semibold text-sm my-auto px-4 py-3 rounded-full ">
              당신의 공간을 등록해주세요
            </button>
            <button
              type="button"
              onClick={() => setShowUserMenu((val) => !val)}
              className="flex align-middle gap-3 rounded-full border border-gray-20 shadow-sm px-4 py-3 my-auto cursor-pointer"
            >
              <AiOutlineMenu />
              <AiOutlineUser />
            </button>
            {showUserMenu && (
              <div
                className={`absolute top-13 bg-white w-70 shadow-gray-500 rounded-lg z-10 border border-gray-200 shadow-md py-2 flex flex-col transition-all duration-300 ease-in-out ${
                  showUserMenu ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                {userMenus?.map((menu) => (
                  <button
                    type="button"
                    key={menu.id}
                    className="h-10 hover:bg-gray-50 text-sm text-gray-700 pl-3 text-center cursor-pointer"
                    onClick={() => router.push(menu.url)}
                  >
                    {menu.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search 영역 */}
        {showFilter === false ? (
          <div className="flex justify-between w-full min-h-15 sm:w-[350px] border border-gray-200 rounded-full py-2 px-6 hover:scale-105 hover:shadow-md">
            <div
              role="presentation"
              className="flex justify-center gap-1 cursor-pointer"
              onClick={() => setShowFilter(true)}
            >
              <div className="my-auto font-semibold text-sm">어디든지</div>
              <RxDividerVertical className="text-gray-200 my-auto text-2xl" />
              <div className="my-auto font-semibold text-sm">언제든</div>
              <RxDividerVertical className="text-gray-200 my-auto text-2xl" />
              <div className="my-auto font-semibold text-sm">게스트</div>
            </div>
            <button
              type="button"
              onClick={() => setShowFilter(true)}
              className="bg-rose-500 text-white rounded-full w-6 h-6 my-auto cursor-pointer"
            >
              <AiOutlineSearch className="text-sm m-auto font-semibold" />
            </button>
          </div>
        ) : (
          <div className="cursor-pointer flex justify-center items-center w-full min-h-20 p-1 flex-wrap gap-3 relative lg:w-[60%]">
            <div className="flex justify-center gap-10 h-5 text-center items-center w-full absolute ">
              <button type="button" className="font-semibold underline underline-offset-8">
                숙소
              </button>
              <button
                type="button"
                className="font-semibold text-gray-700"
                onClick={() => window.alert("서비스 준비중 입니다.")}
              >
                체험
              </button>
              <button type="button" className="font-semibold text-gray-700">
                온라인 체험
              </button>

              <button
                type="button"
                onClick={() => setShowFilter(false)}
                className="bg-rose-500 text-white rounded-full w-6 h-6 my-auto cursor-pointer"
              >
                <RxCross2 className="text-md m-auto font-semibold" />
              </button>
            </div>

            <div
              className="w-full absolute top-20 md:w-full md:absolute md:top-20 md:flex-row shadow-md shadow-gray-500
                flex flex-col sm:flex-row border-gray-200 rounded-lg py-4 px-2 sm:py-0 sm:rounded-full  bg-white cursor-pointer justify-between mx-auto min-h-12 gap-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-4 w-full gap-4 relative ">
                <button
                  type="button"
                  onClick={() => setDetailFilter("location")}
                  className={`text-black rounded-full my-2 hover:bg-gray-100 py-3 px-6 text-left cursor-pointer ${
                    detailFilter === "location" ? "bg-gray-200 my-2 shadow:bg-gray font-semibold" : ""
                  }`}
                >
                  여행지
                  <div className="text-gray-500 text-xs">{filterValue?.location || "여행지 검색"}</div>
                </button>
                <button
                  type="button"
                  onClick={() => setDetailFilter("checkIn")}
                  className={`text-black rounded-full my-2 hover:bg-gray-100 py-3 px-6 text-left cursor-pointer ${
                    detailFilter === "checkIn" ? "bg-gray-200 my-2 shadow:bg-gray font-semibold" : ""
                  }`}
                >
                  체크인
                  <div className="text-gray-500 text-xs">
                    {checkInDate ? checkInDate.format("YYYY-MM-DD").toString() : "날짜 추가"}
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setDetailFilter("checkOut")}
                  className={`text-black rounded-full my-2 hover:bg-gray-100 py-3 px-6 text-left cursor-pointer ${
                    detailFilter === "checkOut" ? "bg-gray-200 my-2 shadow:bg-gray font-semibold" : ""
                  }`}
                >
                  체크아웃
                  <div className="text-gray-500 text-xs">
                    {checkOutDate ? checkOutDate.format("YYYY-MM-DD").toString() : "날짜 추가"}
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setDetailFilter("guest")}
                  className={`text-black rounded-full my-2 hover:bg-gray-100 py-3 px-6 text-left cursor-pointer ${
                    detailFilter === "guest" ? "bg-gray-200 my-2 shadow:bg-gray font-semibold" : ""
                  }`}
                >
                  여행자
                  <div className="text-gray-500 text-xs">{`${filterValue?.guest} 명` || "게스트 추가"}</div>
                </button>
              </div>

              <button
                type="button"
                className=" bg-rose-700 text-white rounded-full h-10 mx-1 sm:w-30 my-auto flex justify-center gap-2 px-3 py-2 items-center hover:shadow hover:bg-rose-500 cursor-pointer"
                onClick={() => {
                  setShowFilter(false);
                  setDetailFilter(null);
                }}
              >
                <AiOutlineSearch />
                검색
              </button>

              {detailFilter === "location" && (
                <div className="absolute w-full top-118 sm:top-[90px] shadow-md shadow-gray-500 border border-gray-200 px-8 py-10 flex flex-col bg-white rounded-xl left-0">
                  <LocationFilter
                    filterValue={filterValue}
                    setFilterValue={setFilterValue}
                    setDetailFilter={setDetailFilter}
                  />
                </div>
              )}
              {detailFilter === "checkIn" && (
                <div className="absolute w-full top-118 sm:top-[90px] shadow-md shadow-gray-500 border border-gray-200 px-8 py-10 flex items-center flex-col bg-white rounded-xl left-0">
                  <CheckInFilter />
                </div>
              )}
              {detailFilter === "checkOut" && (
                <div className="absolute w-full top-118 sm:top-[90px] shadow-md shadow-gray-500 border border-gray-200 px-8 py-10 flex items-center flex-col bg-white rounded-xl left-0">
                  <CheckOutFilter />
                </div>
              )}
              {detailFilter === "guest" && (
                <div className="absolute w-full top-118 sm:top-[90px] shadow-md shadow-gray-500 border border-gray-200 px-8 py-10 flex flex-col bg-white rounded-xl left-0">
                  <GuestFilter
                    filterValue={filterValue}
                    setFilterValue={setFilterValue}
                    setDetailFilter={setDetailFilter}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

interface FilterComponentProps {
  filterValue: FilterProps;
  setFilterValue: React.Dispatch<React.SetStateAction<FilterProps>>;
  setDetailFilter: React.Dispatch<React.SetStateAction<DetailFilterType | null>>;
}

// 지역 선택 컴포넌트
const LocationFilter = ({ filterValue, setFilterValue, setDetailFilter }: FilterComponentProps) => {
  return (
    <>
      <div className="text-sm font-semibold text-black">지역으로 검색하기</div>
      <div className="flex flex-wrap justify-between gap-4 mt-4">
        {["서울", "부산", "대구", "인천", "광주", "대전", "울산"]?.map((value) => (
          <button
            key={value}
            type="button"
            className={`text-black border rounded-lg px-5 py-2.5 hover:bg-gray-200 focus:bg-rose-500 focus:text-white ${
              filterValue.location === value && "bg-rose-600 text-white"
            }`}
            onClick={() => {
              setFilterValue({
                ...filterValue,
                location: value,
              });
              setDetailFilter("checkIn");
            }}
          >
            {value}
          </button>
        ))}
      </div>
    </>
  );
};

// 게스트 수 선택 컴포넌트
const GuestFilter = ({ filterValue, setFilterValue }: FilterComponentProps) => {
  const [counter, setCounter] = useState<number>(filterValue.guest || 0); // 게스트 인원

  return (
    <>
      <div className="text-sm font-semibold text-black">게스트 수 추가하기</div>
      <div className="mt-4 border border-gray-200 rounded-lg py-2 px-4 flex justify-between items-center">
        <div>
          <div className=" text-black text-sm">게스트 수 추가</div>
          <div className="text-gray-500 text-sm">숙박 인원을 입력해주세요</div>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <button
            type="button"
            disabled={counter <= 0}
            className="rounded-full w-9 h-9 disabled:border-gray-200 hover:border-black"
            onClick={() => {
              setCounter((val) => val - 1);
              setFilterValue({
                ...filterValue,
                guest: counter - 1,
              });
            }}
          >
            <AiOutlineMinusCircle
              className={`${counter <= 0 ? "text-gray-200" : "text-black"} mx-auto w-6 h-6 cursor-pointer`}
            />
          </button>
          <div className="w-5 text-center text-black">{counter}</div>
          <button
            type="button"
            disabled={counter >= 10}
            className="rounded-full w-9 h-9 disabled:border-gray-200 hover:border-black"
            onClick={() => {
              setCounter((val) => val + 1);
              setFilterValue({
                ...filterValue,
                guest: counter + 1,
              });
            }}
          >
            <AiOutlinePlusCircle
              className={`${counter >= 10 ? "text-gray-200" : "text-black"}  w-6 h-6 cursor-pointer mx-auto`}
            />
          </button>
        </div>
      </div>
    </>
  );
};
