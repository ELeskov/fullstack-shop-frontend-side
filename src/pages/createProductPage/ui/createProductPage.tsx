import { CreateNewProductForm } from '@/widgets/createNewProductForm'
import { ProfileHeader } from '@/widgets/profileHeader'

import s from './createProductPage.module.scss'

export function CreateProductPage() {
  return (
    <div className={s['create-product-page']}>
      <ProfileHeader title="Новый товар" />
      <CreateNewProductForm />
    </div>
  )
}
