"use client";

import cn from "classnames";
import { useRecoilState } from "recoil";
import { BiReset } from "react-icons/bi";
import { filterState } from "@/app/atom";
import { CATEGORY_DATA } from "../../constants";

export default function CategoryList() {
  const [filterValue, setFilterValue] = useRecoilState(filterState);
  return (
    <div className="flex gap-6 fixed top-20 inset-x-0 mx-auto overflow-x-scroll w-full flex-nowrap sm:pl-24 sm:pr-16 px-2 bg-white z-10 mb-6">
      <button
        data-cy="category-filter-all"
        className="flex-none justify-center gap-3 py-4 w-16 text-center"
        onClick={() => {
          setFilterValue({
            ...filterValue,
            category: "",
          });
        }}
      >
        <div
          className={cn("flex flex-col justify-center gap-3 text-gray-500 hover:text-gray-700 cursor-pointer", {
            "underline underline-offset-8 font-semibold text-black": filterValue.category === "",
          })}
        >
          <div className="text-2xl mx-auto">
            <BiReset />
          </div>
          <div className="text-xs">전체</div>
        </div>
      </button>
      {CATEGORY_DATA?.map((category) => (
        <button
          data-cy={`category-filter-${category.title}`}
          type="button"
          key={category.title}
          onClick={() =>
            setFilterValue({
              ...filterValue,
              category: category.title,
            })
          }
          className={cn("flex-none text-gray-500 hover:text-gray-700 gap-3 justify-center py-4 w-16 text-center", {
            "text-black font-semibold underline underline-offset-8": filterValue.category === category.title,
          })}
        >
          <div className="flex-col flex justify-center gap-3">
            <div className="text-2xl mx-auto">
              <category.Icon />
            </div>
            <div className="text-gray-700 text-xs text-center">{category.title}</div>
          </div>
        </button>
      ))}
    </div>
  );
}
