import React, { type ChangeEvent, useEffect, useState } from 'react'

import clsx from 'clsx'

import { Input } from '@/shared/ui/components/ui/input' // Ваш базовый Input

import s from './inputPrice.module.scss'

interface InputPriceProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string | number
  onChange: (value: string) => void
}

export function InputPrice({
  value,
  onChange,
  className,
  ...props
}: InputPriceProps) {
  const [displayValue, setDisplayValue] = useState('')

  const formatPrice = (val: string | number) => {
    if (!val) {
      return ''
    }
    const stringValue = String(val).replace(/\D/g, '')
    return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  useEffect(() => {
    setDisplayValue(formatPrice(value))
  }, [value])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value

    const cleanValue = rawValue.replace(/\s/g, '')

    if (cleanValue === '' || /^\d+$/.test(cleanValue)) {
      setDisplayValue(formatPrice(cleanValue))
      onChange(cleanValue)
    }
  }

  return (
    <Input
      {...props}
      type="text"
      inputMode="numeric"
      value={displayValue}
      onChange={handleChange}
      className={clsx(s['input-price'], className)}
    />
  )
}
