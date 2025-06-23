import { useMemo } from 'react'
import { ButtonType, ButtonTypeStyle } from './button.constant'
import cn from 'classnames'

interface ButtonProps {
  primary?: boolean
  type?: ButtonType
  label: string
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export const Button = ({
  primary = false,
  type = ButtonType.PRIMARY_LARGE,
  label,
  className,
  ...props
}: ButtonProps) => {
  const ButtonTypeClass = useMemo(() => {
    if (primary) {
      return ButtonTypeStyle.PRIMARY_LARGE
    }
    if (type) {
      return ButtonTypeStyle[type]
    }
    return ''
  }, [type, primary])

  return (
    <button type="button" {...props} className={cn(className, ButtonTypeClass)}>
      {label}
    </button>
  )
}
