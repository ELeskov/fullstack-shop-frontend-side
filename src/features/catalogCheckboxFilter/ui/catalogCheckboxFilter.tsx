import { useState } from 'react'

import { ChevronDown, ChevronUp } from 'lucide-react'

import type {
  SchemaCategoryResponseDto,
  SchemaColorResponseDto,
  SchemaShopResponseDto,
} from '@/shared/api/api-endpoints'
import { Badge } from '@/shared/ui/components/ui/badge'
import { Checkbox } from '@/shared/ui/components/ui/checkbox'
import { Input } from '@/shared/ui/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/components/ui/popover'
import { ScrollArea } from '@/shared/ui/components/ui/scroll-area'
import { CustomButton } from '@/shared/ui/customButton'

import s from './catalogCheckboxFilter.module.scss'

interface CatalogCheckboxFilterProps {
  title: string
  options:
    | SchemaCategoryResponseDto[]
    | SchemaColorResponseDto[]
    | SchemaShopResponseDto[]
  selectedIds: string[]
  onChange: (ids: string[]) => void
  showSearch?: boolean
}

export function CatalogCheckboxFilter({
  title,
  options,
  selectedIds,
  onChange,
  showSearch = false,
}: CatalogCheckboxFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [localSelected, setLocalSelected] = useState<string[]>(selectedIds)
  const [search, setSearch] = useState('')

  const filteredOptions = options.filter((o) =>
    o.title.toLowerCase().includes(search.toLowerCase()),
  )

  const toggleOption = (id: string) => {
    setLocalSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    )
  }

  const handleReset = () => {
    setLocalSelected([])
    setSearch('')
    onChange([])
    setIsOpen(false)
  }

  const handleApply = () => {
    onChange(localSelected)
    setIsOpen(false)
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (open) {
      setLocalSelected(selectedIds)
    }
  }

  const isActive = selectedIds.length > 0

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <CustomButton variant={'outline'}>
          {title}
          {isActive && <Badge>{selectedIds.length}</Badge>}
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </CustomButton>
      </PopoverTrigger>

      <PopoverContent align="start" className={s['checkbox-filter__content']}>
        {showSearch && (
          <Input
            placeholder="Найти в списке"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={s['checkbox-filter__search']}
          />
        )}

        <ScrollArea>
          <div className={s['checkbox-filter__list']}>
            {filteredOptions.map((option) => (
              <label key={option.id} className={s['checkbox-filter__option']}>
                <Checkbox
                  className="size-5"
                  checked={localSelected.includes(option.id)}
                  onCheckedChange={() => toggleOption(option.id)}
                />
                <span className={s['checkbox-filter__option-text']}>
                  {option.title}
                </span>
              </label>
            ))}
            {filteredOptions.length === 0 && (
              <p className={s['checkbox-filter__empty']}>Ничего не найдено</p>
            )}
          </div>
        </ScrollArea>

        <div className={s['checkbox-filter__actions']}>
          <CustomButton
            type="button"
            className={s['checkbox-filter__btn']}
            onClick={handleReset}
          >
            Сбросить
          </CustomButton>
          <CustomButton
            type="button"
            variant={'default'}
            className={s['checkbox-filter__btn']}
            onClick={handleApply}
          >
            Готово
          </CustomButton>
        </div>
      </PopoverContent>
    </Popover>
  )
}
