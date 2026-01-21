import { ROUTES } from '@/shared/config'

import { MainLayout } from '@/app/layout/mainLayout'
import { CartPage } from '@/pages/cartPage/ui/cartPage'
import { CatalogPage } from '@/pages/catalogPage'
import { HomePage } from '@/pages/homePage'
import { LoginPage } from '@/pages/loginPage'
import { SignupPage } from '@/pages/signupPage'

export const publicRoutes = [
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.catalog, element: <CatalogPage /> },
      {
        path: ROUTES.profile.cart,
        element: <CartPage />,
      },
      {
        path: ROUTES.login,
        element: <LoginPage />,
      },
      {
        path: ROUTES.signup,
        element: <SignupPage />,
      },
    ],
  },
]
