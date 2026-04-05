import { AdminProductsDataTable } from '@/widgets/adminProductsDataTable'
import { ProfileHeader } from '@/widgets/profileHeader'

import s from './adminProductsPage.module.scss'

export function AdminProductsPage() {
  return (
    <section className={s['admin-products-page']}>
      <ProfileHeader title="Товары платформы" />
      <AdminProductsDataTable />
    </section>
  )
}
