import { useState } from 'react'

import { ArrowUpDown, ChevronDown } from 'lucide-react'

import { SORT_OPTIONS, type SortOptionId } from '@/features/dropdownFilter/lib'

import { Button } from '@/shared/ui/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/shared/ui/components/ui/dropdown-menu'

import s from './dropdownFilter.module.scss'

export function DropdownFilter() {
  const [selectedOption, setSelectedOption] =
    useState<SortOptionId>('option-one')

  const currentOption = SORT_OPTIONS.find(
    (option) => option.id === selectedOption,
  )
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={s['dropdown-filter__btn']} variant="outline">
          <ArrowUpDown size={24} />
          <span className="select-none">{currentOption?.label}</span>
          <ChevronDown className="text-white/40" />{' '}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        defaultValue="option-one"
        align="start"
        className="w-max"
      >
        <DropdownMenuRadioGroup
          value={selectedOption}
          onValueChange={(value) => {
            setSelectedOption(value as SortOptionId)
          }}
        >
          {SORT_OPTIONS.map((option) => (
            <DropdownMenuRadioItem
              key={option.id}
              className="cursor-pointer text-base"
              value={option.id}
            >
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
