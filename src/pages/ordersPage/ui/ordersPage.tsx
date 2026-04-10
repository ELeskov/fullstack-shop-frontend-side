import { OrdersDataTable } from '@/widgets/ordersDataTable'
import { ProfileHeader } from '@/widgets/profileHeader'

import s from './ordersPage.module.scss'

export function OrdersPage() {
  return (
    <section className={s['orders-page']}>
      <ProfileHeader title="Заказы" />
      <OrdersDataTable />
    </section>
  )
}
