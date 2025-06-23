import { useMemo } from 'react'
import { TextType, TextTypeStyle } from './text.constant'
import cn from 'classnames'

interface TextProps {
  type?: TextType
  label: string
  className?: string
}

export const Text = ({ type = TextType.DESC, label, className }: TextProps) => {
  const TextTypeClass = useMemo(() => {
    if (type) {
      return TextTypeStyle[type]
    }
    return ''
  }, [type])

  return <div className={cn(className, TextTypeClass)}>{label}</div>
}
