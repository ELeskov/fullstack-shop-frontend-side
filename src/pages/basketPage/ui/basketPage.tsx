import { BasketProductsList } from '@/widgets/basketProductsList'
import { BasketSummary } from '@/widgets/basketSummary'
import { Breadcrumbs } from '@/widgets/breadcrumbs'

import { TitlePage } from '@/shared/ui/titlePage/titlePage'

import s from './basketPage.module.scss'

export function BasketPage() {
  return (
    <div className={s['basket-page']}>
      <Breadcrumbs />
      <TitlePage text="Корзина" />

      <section className={s['basket-page__content']}>
        <div className={s['basket-products-wrapper']}>
          <BasketProductsList />
        </div>

        <BasketSummary />
      </section>
    </div>
  )
}
