import {
  Album,
  ChartNoAxesColumnIncreasing,
  CircleUserRound,
  GalleryHorizontalEnd,
  PaintBucket,
  Settings,
  ShoppingBag,
  UserStar,
} from 'lucide-react'

import shopImage from '@/shared/assets/icons/favicon-bg-white.svg'
import { ROUTES } from '@/shared/config'

export const profileNavData = {
  shops: [
    {
      shopImage: shopImage,
      title: 'VK',
    },
    {
      shopImage: shopImage,
      title: 'yandex',
    },
    {
      shopImage: shopImage,
      title: 'google',
    },
  ],
  navMain: [
    {
      title: 'Аккаунт',
      items: [
        {
          title: 'Профиль',
          url: ROUTES.profile.root,
          icon: <CircleUserRound />,
        },
      ],
    },
    {
      title: 'О магазине',
      items: [
        {
          title: 'Статистика',
          url: ROUTES.profile.shops.statistics,
          icon: <ChartNoAxesColumnIncreasing />,
        },
        {
          title: 'Мои товары',
          url: ROUTES.profile.shops.products.root,
          createPath: ROUTES.profile.shops.products.create,
          icon: <GalleryHorizontalEnd />,
          isCreated: true,
        },
        {
          title: 'Цвета',
          url: ROUTES.profile.shops.colors.root,
          createPath: ROUTES.profile.shops.colors.create,
          icon: <PaintBucket />,
          isCreated: true,
        },
        {
          title: 'Категории',
          url: ROUTES.profile.shops.categories.root,
          createPath: ROUTES.profile.shops.categories.create,
          icon: <Album />,
          isCreated: true,
        },
        {
          title: 'Отзывы',
          url: ROUTES.profile.shops.reviews,
          icon: <UserStar />,
        },
        {
          title: 'Покупки',
          url: ROUTES.profile.orders,
          icon: <ShoppingBag />,
        },
        {
          title: 'Настройка магазина',
          url: ROUTES.profile.shops.settings,
          icon: <Settings />,
        },
      ],
    },
  ],
}
