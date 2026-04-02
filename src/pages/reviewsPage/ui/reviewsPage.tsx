import { ProfileHeader } from '@/widgets/profileHeader'
import { ReviewsDataTable } from '@/widgets/reviewsDataTable'

import s from './reviewsPage.module.scss'

export function ReviewsPage() {
  return (
    <section className={s['reviews-page']}>
      <ProfileHeader title="Отзывы" />
      <ReviewsDataTable />
    </section>
  )
}
