import { CreateCategoryForm } from '@/widgets/createCategoryForm'
import { ProfileHeader } from '@/widgets/profileHeader'

import s from './createCategoriesPage.module.scss'

export function CreateCategoriesPage() {
  return (
    <div className={s['create-categories-page']}>
      <ProfileHeader title="Новая категория" />
      <CreateCategoryForm />
    </div>
  )
}
