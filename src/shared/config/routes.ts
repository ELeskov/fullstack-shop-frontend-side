import { createRoutes } from '../lib'

export const ROUTES = {
  home: '/',
  login: '/login',
  signup: '/signup',
  catalog: '/catalog',
  product: createRoutes('/product', {
    id: (id: string) => `${id}`,
    path: '/:id',
  }),
  verify: '/auth/verify',
  resetPassword: '/auth/reset-password',
  sendResetPasswordEmail: '/send-reset-email',

  profile: createRoutes('/profile', {
    favorites: '/favorites',
    basket: '/basket',
    purchase: '/purchase',
    orders: '/orders',

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
        edit: {
          path: '/edit/:productId',
          to: (productId: string) => `/edit/${productId}`,
        },
      },
      colors: {
        create: '/create',
      },
      categories: {
        create: '/create',
      },
    },

    settings: '/settings',
  }),
} as const
