import { ProtectedRoute } from '@/shared/ui/protectedRoute'

import { MainLayout } from '../layout/mainLayout'

import { CartPage } from '@/pages/cartPage/ui/cartPage'
import { LikePage } from '@/pages/likePage'
import { ProfilePage } from '@/pages/profilePage'

export const userRoutes = {
  element: (
    <ProtectedRoute requiredRole="REGULAR">
      <MainLayout />
    </ProtectedRoute>
  ),
  children: [
    { path: 'profile', element: <ProfilePage /> },
    { path: 'profile/like', element: <LikePage /> },
    { path: 'profile/cart', element: <CartPage /> },
  ],
}
