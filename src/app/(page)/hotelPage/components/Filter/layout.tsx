import { FilterLayoutProps } from '@/interface'
import cn from 'classnames'

export default function FilterLayout({
  children,
  title,
  isShow,
  dataTitle = '',
}: FilterLayoutProps) {
  return (
    <div
      data-cy={dataTitle}
      className={cn(
        'z-[10] absolute top-80 sm:top-[70px] border border-gray-200 px-8 py-10 flex flex-col bg-white w-full mx-auto inset-x-0 sm:max-w-3xl md:w-[780px] sm:w-[640px] rounded-xl',
        {
          hidden: !isShow,
        },
      )}
    >
      <div className="text-sm font-semibold">{title}</div>
      {children}
    </div>
  )
}
