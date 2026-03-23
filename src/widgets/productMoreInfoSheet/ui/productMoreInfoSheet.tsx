import { ProductSummaryButtons } from '@/features/productSummaryButtons'

import type { SchemaGroupOptionResponseDto } from '@/shared/api/api-endpoints'
import { Badge } from '@/shared/ui/components/ui/badge'
import { ScrollArea } from '@/shared/ui/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/components/ui/sheet'
import { ProductTableOption } from '@/shared/ui/productTableOption'

import s from './productMoreInfoSheet.module.scss'

type ProductMoreInfoSheetProps = {
  optionsGroup: SchemaGroupOptionResponseDto[]
}
export function ProductMoreInfoSheet({
  optionsGroup,
}: ProductMoreInfoSheetProps) {
  return (
    <div className={s['product-more-info-sheet']}>
      <Sheet>
        <SheetTrigger asChild>
          <Badge
            variant={'secondary'}
            className="cursor-pointer hover:bg-white/15 transition-all"
          >
            Характеристики и описание
          </Badge>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="px-4 min-w-145 max-lg:min-w-100 flex flex-col"
        >
          <ScrollArea className="h-full px-6 pb-6 max-lg:px-0">
            <SheetHeader className="px-0">
              <SheetTitle className="text-2xl!">
                Характеристики и описание
              </SheetTitle>
            </SheetHeader>
            {optionsGroup.map(({ options, groupName }, i) => (
              <section key={i}>
                <h3 className="py-2 pt-4">{groupName}</h3>
                <ProductTableOption mainOptionsGroup={options} />
              </section>
            ))}
            <SheetFooter className="px-0 sticky bottom-0 z-50 bg-black mt-3">
              <ProductSummaryButtons />
            </SheetFooter>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  )
}
