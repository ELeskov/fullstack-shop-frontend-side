import clsx from 'clsx'

import { Breadcrumbs } from '@/widgets/breadcrumbs'
import { FavoritesProductsList } from '@/widgets/favoritesProductsList/ui/favoritesProductsList'

import { TitlePage } from '@/shared/ui/titlePage'

import s from './favoritesPagePage.module.scss'

export function FavoritesPage() {
  return (
    <div className={clsx(s['like-page'])}>
      <Breadcrumbs />
      <TitlePage text="Избранное" />
      <section className={s['like-products-wrapper']}>
        <FavoritesProductsList />
      </section>
    </div>
  )
}
