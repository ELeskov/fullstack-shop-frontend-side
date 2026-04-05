import { useLocation } from 'react-router'

import { ProfileHeader } from '@/widgets/profileHeader'

import { ROUTES } from '@/shared/config'

import s from './adminComingSoonPage.module.scss'

export function AdminComingSoonPage() {
  const { pathname } = useLocation()

  const sectionName =
    pathname === ROUTES.admin.shops ? 'Магазины' : 'Товары'

  return (
    <section className={s['admin-coming-soon']}>
      <ProfileHeader title={sectionName} />

      <div className={s['admin-coming-soon__card']}>
        <h2 className={s['admin-coming-soon__title']}>Раздел в разработке</h2>
        <p className={s['admin-coming-soon__description']}>
          Раздел <b>{sectionName}</b> уже зарезервирован в структуре
          админ-панели и будет добавлен в следующих итерациях.
        </p>
      </div>
    </section>
  )
}
