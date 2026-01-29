import { createBrowserRouter } from 'react-router'

import { ROUTES } from '@/shared/config'
import { FallBack } from '@/shared/ui/fallback'
import { ProtectedRoute } from '@/shared/ui/protectedRoute'

import { ProfileLayout } from '../layout/profileLayout'

import { MainLayout } from '@/app/layout/mainLayout'
import { CartPage } from '@/pages/cartPage/ui/cartPage'
import { CatalogPage } from '@/pages/catalogPage'
import { CategoryPage } from '@/pages/categoryPage'
import { ColorsPage } from '@/pages/colorsPage'
import { CreateColorsPage } from '@/pages/createColorsPage'
import { CreateProductPage } from '@/pages/createProductPage'
import { HomePage } from '@/pages/homePage'
import { LikePage } from '@/pages/likePage'
import { LoginPage } from '@/pages/loginPage'
import { MyProductPage } from '@/pages/myProductPage'
import { ProfilePage } from '@/pages/profilePage'
import { SignupPage } from '@/pages/signupPage'
import { StatisticsPage } from '@/pages/statisticsPage'
import { VerifyPage } from '@/pages/verifyPage'

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <FallBack />,
    children: [
      {
        path: ROUTES.home,
        element: <HomePage />,
      },
      {
        path: ROUTES.login,
        element: <LoginPage />,
      },
      {
        path: ROUTES.signup,
        element: <SignupPage />,
      },
      {
        path: ROUTES.catalog,
        element: <CatalogPage />,
      },
      {
        path: ROUTES.profile.cart,
        element: <CartPage />,
      },
      {
        path: ROUTES.verify,
        element: <VerifyPage />,
      },
    ],
  },
  {
    element: (
      <ProtectedRoute requiredRole="REGULAR">
        <MainLayout />
      </ProtectedRoute>
    ),
    errorElement: <FallBack />,
    children: [
      {
        path: ROUTES.profile.like,
        element: <LikePage />,
      },
    ],
  },
  {
    element: (
      <ProtectedRoute requiredRole="REGULAR">
        <ProfileLayout />
      </ProtectedRoute>
    ),
    errorElement: <FallBack />,
    children: [
      {
        path: ROUTES.profile.root,
        element: <ProfilePage />,
      },
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
  },
])
