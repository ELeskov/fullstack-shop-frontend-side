import {
  Album,
  ChartNoAxesColumnIncreasing,
  CircleUserRound,
  GalleryHorizontalEnd,
  Heart,
  PaintBucket,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Store,
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
        {
          title: 'Избранное',
          url: ROUTES.profile.like,
          icon: <Heart />,
        },
        {
          title: 'Покупки',
          url: ROUTES.profile.orders,
          icon: <ShoppingBag />,
        },
        {
          title: 'Корзина',
          url: ROUTES.profile.orders,
          icon: <ShoppingCart />,
        },
        {
          title: 'Настройки',
          url: ROUTES.profile.settings,
          icon: <Settings />,
        },
      ],
    },
    {
      title: 'Магазин',
      items: [
        {
          title: 'Мои магазины',
          url: ROUTES.profile.shops.root,
          icon: <Store />,
          isCreated: true,
          createPath: ROUTES.profile.shops.create,
        },
        {
          title: 'Статистика',
          url: ROUTES.profile.shops.statistics,
          icon: <ChartNoAxesColumnIncreasing />,
        },
        {
          title: 'Мои товары',
          url: ROUTES.profile.shops.products.root,
          icon: <GalleryHorizontalEnd />,
          isCreated: true,
          createPath: ROUTES.profile.shops.products.create,
        },
        {
          title: 'Цвета',
          url: ROUTES.profile.shops.colors.root,
          icon: <PaintBucket />,
          isCreated: true,
          createPath: ROUTES.profile.shops.colors.create,
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
          title: 'Настройки',
          url: ROUTES.profile.shops.settings,
          icon: <Settings />,
        },
      ],
    },
  ],
}
