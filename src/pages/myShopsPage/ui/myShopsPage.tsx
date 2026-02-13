import { ProfileHeader } from '@/widgets/profileHeader'
import { ShopCardList } from '@/widgets/shopCardList'

export function MyShopsPage() {
  return (
    <div>
      <ProfileHeader title="Мои магазины" />
      <ShopCardList />
    </div>
  )
}
