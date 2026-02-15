import { createRoutes } from '../lib'

export const ROUTES = {
  home: '/',
  login: '/login',
  signup: '/signup',
  catalog: '/catalog',
  product: '/product',
  verify: '/auth/verify',
  resetPassword: '/auth/reset-password',
  sendResetPasswordEmail: '/send-reset-email',

  profile: createRoutes('/profile', {
    like: '/likes',
    basket: '/basket',

    shops: {
      edit: {
        path: '/edit/:shopId',
        to: (shopId: string) => `/edit/${shopId}`,
      },
      create: '/create',
      reviews: '/reviews',
      settings: '/settings',
      statistics: '/statistics',
      products: {
        create: '/create',
        edit: '/edit',
      },
      colors: {
        create: '/create',
        edit: '/edit',
      },
      categories: {
        create: '/create',
        edit: '/edit',
      },
    },

    orders: '/orders',
    settings: '/settings',
  }),
} as const
