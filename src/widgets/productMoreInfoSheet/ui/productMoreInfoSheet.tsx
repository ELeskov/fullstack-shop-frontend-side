import { ProductSummaryButtons } from '@/features/productSummaryButtons'
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

const productSpecs = [
  {
    title: 'Основная информация',
    options: [
      { label: 'Цвет', value: 'синий' },
      { label: 'Обязательное предустановленное российское ПО', value: 'нет' },
    ],
  },
  {
    title: 'Общие характеристики',
    options: [
      { label: 'Модель', value: 'iPhone 17 Pro Max' },
      { label: 'Тип SIM карты', value: 'eSIM+eSIM' },
      { label: 'Операционная система', value: 'iOS' },
      { label: 'Версия операционной системы', value: 'iOS 26' },
      { label: 'Гарантийный срок', value: '1 год' },
      { label: 'Степень пылевлагозащиты', value: 'IP68' },
    ],
  },
  {
    title: 'Экран',
    options: [
      { label: 'Тип дисплея/экрана', value: 'Super Retina XDR' },
      { label: 'Диагональ экрана', value: '6.9"' },
      { label: 'Разрешение экрана', value: '2868x1320' },
      { label: 'Частота обновления', value: '120 Гц' },
      { label: 'Защитное покрытие экрана', value: 'Ceramic Shield 2' },
    ],
  },
  {
    title: 'Память',
    options: [
      { label: 'Объем встроенной памяти (Гб)', value: '2 TБ' },
      { label: 'Объем оперативной памяти (Гб)', value: '12 ГБ' },
      { label: 'Тип карты памяти', value: 'не поддерживается' },
    ],
  },
  {
    title: 'Мультимедийные возможности',
    options: [
      { label: 'Основная камера (млн. пикс.)', value: '48 Мп' },
      { label: 'Вторая основная камера (млн. пикс.)', value: '48 Мп' },
      { label: 'Третья основная камера', value: '48 Мп' },
      { label: 'Фронтальная камера (млн. пикс.)', value: '18 Мп' },
      {
        label: 'Особенности объектива',
        value:
          'автоматическая стабилизация; функция Smart HDR 5; портреты с контролем фокусировки',
      },
      {
        label: 'Доп. опции камеры',
        value:
          'коррекция искажений объектива; 15-кратный цифровой зум; ночная съемка',
      },
      { label: 'Встроенная вспышка', value: 'да' },
    ],
  },
]

export function ProductMoreInfoSheet() {
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

        <SheetContent side="right" className="px-4 min-w-145 flex flex-col">
          <ScrollArea className="h-full px-6 pb-6">
            <SheetHeader className="px-0">
              <SheetTitle className="text-2xl!">
                Характеристики и описание
              </SheetTitle>
            </SheetHeader>
            {productSpecs.map(({ options, title }, i) => (
              <Section title={title}>
                <ProductTableOption key={i} arrayOption={options} />
              </Section>
            ))}
            <SheetFooter className="px-0">
              <ProductSummaryButtons />
            </SheetFooter>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-muted-foreground mb-3">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  )
}
