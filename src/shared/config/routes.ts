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
      create: '/create',
      reviews: '/reviews',
      settings: '/settings',
      statistics: '/statistics',
      products: {
        create: '/create',
      },
      colors: {
        create: '/create',
      },
      categories: {
        create: '/create',
      },
    },

    orders: '/orders',
    settings: '/settings',
  }),
} as const
