import { useState } from 'react'

import { ChevronDown, ChevronUp } from 'lucide-react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/components/ui/popover'
import { CustomButton } from '@/shared/ui/customButton'
import { InputPrice } from '@/shared/ui/inputPrice'

import s from './catalogPriceFilter.module.scss'

interface CatalogPriceFilterProps {
  minPrice: string
  maxPrice: string
  onChange: (min: string, max: string) => void
}

export function CatalogPriceFilter({
  minPrice,
  maxPrice,
  onChange,
}: CatalogPriceFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [localMin, setLocalMin] = useState(minPrice)
  const [localMax, setLocalMax] = useState(maxPrice)

  const handleReset = () => {
    setLocalMin('')
    setLocalMax('')
    onChange('', '')
    setIsOpen(false)
  }

  const handleApply = () => {
    onChange(localMin, localMax)
    setIsOpen(false)
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (open) {
      setLocalMin(minPrice)
      setLocalMax(maxPrice)
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <CustomButton variant={'outline'}>
          Цена, ₽{isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </CustomButton>
      </PopoverTrigger>

      <PopoverContent align="start" className={s['price-filter__content']}>
        <div className={s['price-filter__inputs']}>
          <div className={s['price-filter__field']}>
            <label className={s['price-filter__label']}>От</label>
            <InputPrice
              placeholder="0"
              value={localMin}
              onChange={(val) => setLocalMin(val)}
            />
          </div>

          <div className={s['price-filter__field']}>
            <label className={s['price-filter__label']}>До</label>
            <InputPrice
              placeholder="100 000"
              value={localMax}
              onChange={(val) => setLocalMax(val)}
            />
          </div>
        </div>

        <div className={s['price-filter__actions']}>
          <CustomButton
            type="button"
            className={s['price-filter__btn']}
            onClick={handleReset}
          >
            Сбросить
          </CustomButton>
          <CustomButton
            type="button"
            variant={'default'}
            className={s['price-filter__btn']}
            onClick={handleApply}
          >
            Готово
          </CustomButton>
        </div>
      </PopoverContent>
    </Popover>
  )
}
