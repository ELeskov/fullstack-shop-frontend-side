import { ArrowUpDown, ChevronDown } from 'lucide-react'

import {
  SORT_OPTIONS,
  type SortOptionValue,
} from '@/features/catalogSortSelect/lib'

import { Button } from '@/shared/ui/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/shared/ui/components/ui/dropdown-menu'

import s from './catalogSortSelect.module.scss'

interface CatalogSortSelectProps {
  value: SortOptionValue
  onChange: (value: SortOptionValue) => void
}

export function CatalogSortSelect({ value, onChange }: CatalogSortSelectProps) {
  const currentOption = SORT_OPTIONS.find((option) => option.value === value)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={s['dropdown-filter__btn']} variant="outline">
          <ArrowUpDown size={24} />
          <span className="select-none">{currentOption?.label}</span>
          <ChevronDown className="text-white/40" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-max">
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(v) => onChange(v as SortOptionValue)}
        >
          {SORT_OPTIONS.map((option) => (
            <DropdownMenuRadioItem
              key={option.value}
              className="cursor-pointer text-base"
              value={option.value}
            >
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
