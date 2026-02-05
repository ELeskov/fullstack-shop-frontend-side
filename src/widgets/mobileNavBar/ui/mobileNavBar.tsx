import { FaUser } from 'react-icons/fa6'
import { HiMiniHome } from 'react-icons/hi2'
import { TbListSearch } from 'react-icons/tb'
import { Link, useLocation } from 'react-router'

import clsx from 'clsx'
import { Heart, ShoppingCart } from 'lucide-react'

import { ROUTES } from '@/shared/config'

import s from './mobileNavBar.module.scss'

const navbarPaths = {
  home: ROUTES.home,
  catalog: ROUTES.catalog,
  basket: ROUTES.profile.basket,
  like: ROUTES.profile.like,
  profile: ROUTES.profile.root,
}

const arrayLinks = [
  {
    id: 0,
    path: ROUTES.home,
    icon: <HiMiniHome size={24} className={s['mobile-navbar__icon']} />,
  },
  {
    id: 1,
    path: ROUTES.catalog,
    icon: (
      <TbListSearch
        strokeWidth={2.5}
        size={24}
        className={s['mobile-navbar__icon']}
      />
    ),
  },
  {
    id: 2,
    path: ROUTES.profile.basket,
    icon: (
      <ShoppingCart
        fill="#fff"
        size={24}
        className={s['mobile-navbar__icon']}
      />
    ),
  },
  {
    id: 3,
    path: ROUTES.profile.like,
    icon: <Heart fill="#fff" size={24} className={s['mobile-navbar__icon']} />,
  },
  {
    id: 4,
    path: ROUTES.profile.root,
    icon: <FaUser size={24} className={s['mobile-navbar__icon']} />,
  },
]

export function MobileNavBar() {
  const location = useLocation()

  const getActiveId = (): number | null => {
    const { pathname } = location

    for (const item of arrayLinks) {
      if (pathname === item.path) {
        return item.id
      }
    }

    if (pathname.startsWith(navbarPaths.profile)) {
      return 4
    }

    return null
  }

  const activeId = getActiveId()

  return (
    <div className={clsx(s['mobile-navbar'], 'visible-tablet')}>
      <ul className={s['mobile-navbar__list']}>
        {arrayLinks.map(({ id, path, icon }) => (
          <li
            key={id}
            className={clsx(
              s['mobile-navbar__item'],
              activeId === id && s['mobile-navbar__item--active'],
            )}
          >
            <Link to={path} className={s['mobile-navbar__link']}>
              {icon}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
