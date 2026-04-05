import { AdminShopsDataTable } from '@/widgets/adminShopsDataTable'
import { ProfileHeader } from '@/widgets/profileHeader'

import s from './adminShopsPage.module.scss'

export function AdminShopsPage() {
  return (
    <section className={s['admin-shops-page']}>
      <ProfileHeader title="Магазины платформы" />
      <AdminShopsDataTable />
    </section>
  )
}
