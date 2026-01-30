import { createRoutes } from '../lib'

export const ROUTES = {
  home: '/',
  login: '/login',
  signup: '/signup',
  catalog: '/catalog',
  verify: '/auth/verify',

  profile: createRoutes('/profile', {
    basket: '/basket',
    like: '/likes',

    shops: {
      create: '/create',
      reviews: '/reviews',
      statistics: '/statistics',
      products: {
        create: '/create',
      },
      settings: '/settings',
      colors: {
        create: '/create',
      },
      categories: '/categories',
    },

    settings: '/settings',
    orders: '/orders',
  }),
} as const
