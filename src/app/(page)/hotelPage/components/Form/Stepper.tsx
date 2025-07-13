import cn from 'classnames'

export default function Stepper({ count = 1, className = '' }) {
  return (
    <div className={cn('grid grid-cols-5 gap-3 h-1', className)}>
      {/* 검정 스텝 */}
      {[...Array(count)]?.map((_, i) => (
        <div key={`active-${i}`} className="bg-black w-full rounded-md" />
      ))}
      {/* 회색 스텝 */}
      {[...Array(5 - count)]?.map((_, i) => (
        <div key={`active-${i}`} className="bg-gray-300 w-full rounded-md" />
      ))}
    </div>
  )
}
