'use client'

import { useSetRecoilState } from 'recoil'
import { searchState } from '@/atom'
import { AiOutlineSearch } from 'react-icons/ai'

export default function RoomSearchFilter() {
  const setQ = useSetRecoilState(searchState)

  const debounce = (func: Function, delay: number) => {
    let timerId: NodeJS.Timeout
    return function (...args: any[]) {
      clearTimeout(timerId)
      timerId = setTimeout(() => {
        func(...args)
      }, delay)
    }
  }

  const handleDebounceSearch = (value: string) => {
    setQ({ q: value })
  }

  const debouncedSearch = debounce(handleDebounceSearch, 1000)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e?.target?.value)
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 mb-10">
      <div className="flex items-center justify-center w-full gap-2">
        <input
          type="search"
          onChange={handleInputChange}
          placeholder="숙소명 검색"
          className="w-full block p-3 text-sm border border-gray-300 rounded-lg outline-none focus:border-rose-500 text-gray-800"
        />
        <AiOutlineSearch className="w-6 h-6" />
      </div>
    </div>
  )
}
