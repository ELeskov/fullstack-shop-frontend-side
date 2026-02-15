import { createBrowserRouter } from 'react-router'

import { MainLayout } from '@/app/layout/mainLayout'

import { BasketPage } from '@/pages/basketPage'
import { CatalogPage } from '@/pages/catalogPage'
import { CategoryPage } from '@/pages/categoryPage'
import { ColorsPage } from '@/pages/colorsPage'
import { CreateCategoriesPage } from '@/pages/createCategoriesPage'
import { CreateColorsPage } from '@/pages/createColorsPage'
import { CreateProductPage } from '@/pages/createProductPage'
import { CreateShopPage } from '@/pages/createShopPage'
import { EditShopPage } from '@/pages/editShopPage'
import { ForgotPasswordPage } from '@/pages/forgotPasswordPage'
import { HomePage } from '@/pages/homePage'
import { LikePage } from '@/pages/likePage'
import { LoginPage } from '@/pages/loginPage'
import { MyProductPage } from '@/pages/myProductPage'
import { MyShopsPage } from '@/pages/myShopsPage'
import { ProductPage } from '@/pages/productPage'
import { ProfilePage } from '@/pages/profilePage'
import { ResetPasswordPage } from '@/pages/resetPasswordPage'
import { SignupPage } from '@/pages/signupPage'
import { StatisticsPage } from '@/pages/statisticsPage'
import { VerifyPage } from '@/pages/verifyPage'

import { ROUTES } from '@/shared/config'
import { FallBack } from '@/shared/ui/fallback'
import { ProtectedRoute } from '@/shared/ui/protectedRoute'

import { ProfileLayout } from '../layout/profileLayout'

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
        path: ROUTES.profile.basket,
        element: <BasketPage />,
      },
      {
        path: ROUTES.verify,
        element: <VerifyPage />,
      },
      {
        path: ROUTES.resetPassword,
        element: <ResetPasswordPage />,
      },
      {
        path: ROUTES.sendResetPasswordEmail,
        element: <ForgotPasswordPage />,
      },
      {
        path: ROUTES.product,
        element: <ProductPage />,
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
        path: ROUTES.profile.shops.root,
        element: <MyShopsPage />,
      },
      {
        path: ROUTES.profile.shops.create,
        element: <CreateShopPage />,
      },
      {
        path: ROUTES.profile.shops.edit.path,
        element: <EditShopPage />,
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
        path: ROUTES.profile.shops.products.root,
        element: <MyProductPage />,
      },
      {
        path: ROUTES.profile.shops.categories.root,
        element: <CategoryPage />,
      },
      {
        path: ROUTES.profile.shops.products.create,
        element: <CreateProductPage />,
      },
      {
        path: ROUTES.profile.shops.colors.create,
        element: <CreateColorsPage />,
      },
      {
        path: ROUTES.profile.shops.categories.create,
        element: <CreateCategoriesPage />,
      },
      {
        path: ROUTES.profile.shops.reviews,
        element: <div>Отзывы</div>,
      },
    ],
  },
])
