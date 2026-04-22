import { ROUTES } from '@/shared/config'

export const CATEGORIES = ['Каталог', 'Продукты', 'Реклама']

export const CATALOG_SECTIONS = [
  {
    title: 'Рабочее место',
    href: `${ROUTES.catalog}?category=workspace`,
    description: 'Лампы, держатели, органайзеры и аксессуары для стола.',
  },
  {
    title: 'Гаджеты',
    href: `${ROUTES.catalog}?category=gadgets`,
    description: 'Смарт-устройства и полезная электроника на каждый день.',
  },
  {
    title: 'Для дома',
    href: `${ROUTES.catalog}?category=home`,
    description: 'Практичные товары для уюта, порядка и хранения.',
  },
  {
    title: 'Подарки',
    href: `${ROUTES.catalog}?category=gifts`,
    description: 'Идеи подарков для коллег, друзей и близких.',
  },
  {
    title: 'Новинки',
    href: `${ROUTES.catalog}?sort=new`,
    description: 'Свежие позиции, которые только появились в магазине.',
  },
  {
    title: 'Популярное',
    href: `${ROUTES.catalog}?sort=popular`,
    description: 'Самые востребованные товары по выбору покупателей.',
  },
]
