import { AdminUsersDataTable } from '@/widgets/adminUsersDataTable'
import { ProfileHeader } from '@/widgets/profileHeader'

import s from './adminUsersPage.module.scss'

export function AdminUsersPage() {
  return (
    <section className={s['admin-users-page']}>
      <ProfileHeader title="Пользователи платформы" />
      <AdminUsersDataTable />
    </section>
  )
}
