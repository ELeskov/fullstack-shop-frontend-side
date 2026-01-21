import { ROUTES } from '@/shared/config'
import { ProtectedRoute } from '@/shared/ui/protectedRoute'

import { ProfileLayout } from '../layout/profileLayout'

import { CategoryPage } from '@/pages/categoryPage'
import { ColorsPage } from '@/pages/colorsPage'
import { CreateColorsPage } from '@/pages/createColorsPage'
import { CreateProductPage } from '@/pages/createProductPage'
import { MyProductPage } from '@/pages/myProductPage'
import { StatisticsPage } from '@/pages/statisticsPage'

export const shopRoutes = {
  path: 'profile/shops',
  element: (
    <ProtectedRoute requiredRole="REGULAR">
      <ProfileLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: ROUTES.profile.shops.statistics,
      element: <StatisticsPage />,
    },
    {
      path: ROUTES.profile.shops.colors.root,
      element: <ColorsPage />,
    },
    {
      path: ROUTES.profile.shops.colors.create,
      element: <CreateColorsPage />,
    },
    {
      path: ROUTES.profile.shops.products.root,
      element: <MyProductPage />,
    },
    {
      path: ROUTES.profile.shops.products.create,
      element: <CreateProductPage />,
    },
    {
      path: ROUTES.profile.shops.categories,
      element: <CategoryPage />,
    },
    {
      path: ROUTES.profile.shops.reviews,
      element: <div>Отзывы</div>,
    },
  ],
}
