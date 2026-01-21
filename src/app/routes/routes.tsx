import { createBrowserRouter } from 'react-router'

import { publicRoutes } from './public.routes'
import { shopRoutes } from './shop.routes'
import { userRoutes } from './user.routes'

export const router = createBrowserRouter(
  [...publicRoutes, userRoutes, shopRoutes],
  {
    future: {
      v7_startTransition: true,
    },
  },
)
