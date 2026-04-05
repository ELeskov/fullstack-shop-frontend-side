import { AddToCartButton } from '@/features/addToCartButton'

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
  productId: string
}

export function ProductMoreInfoSheet({
  optionsGroup,
  productId,
}: ProductMoreInfoSheetProps) {
  const normalizedOptionsGroup = Array.isArray(optionsGroup) ? optionsGroup : []

  return (
    <div className={s['product-more-info-sheet']}>
      <Sheet>
        <SheetTrigger asChild>
          <Badge
            variant={'secondary'}
            className={s['product-more-info-sheet__trigger']}
          >
            Характеристики и описание
          </Badge>
        </SheetTrigger>

        <SheetContent
          side="right"
          className={s['product-more-info-sheet__content']}
        >
          <SheetHeader className={s['product-more-info-sheet__header']}>
            <SheetTitle className={s['product-more-info-sheet__title']}>
              Характеристики и описание
            </SheetTitle>
          </SheetHeader>

          <ScrollArea className={s['product-more-info-sheet__scroll']}>
            {normalizedOptionsGroup.length > 0 ? (
              normalizedOptionsGroup.map(
                ({ options, groupName, id }, index) => (
                  <section
                    key={id ?? `${groupName}-${index}`}
                    className={s['product-more-info-sheet__section']}
                  >
                    <h3 className={s['product-more-info-sheet__section-title']}>
                      {groupName || 'Характеристики'}
                    </h3>
                    <ProductTableOption
                      mainOptionsGroup={options ?? []}
                      fullmode
                    />
                  </section>
                ),
              )
            ) : (
              <p className={s['product-more-info-sheet__empty']}>
                Дополнительные характеристики отсутствуют.
              </p>
            )}
          </ScrollArea>

          <SheetFooter className={s['product-more-info-sheet__footer']}>
            <AddToCartButton productId={productId} />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
