import { FaUser } from 'react-icons/fa6'
import { HiMiniHome } from 'react-icons/hi2'
import { TbListSearch } from 'react-icons/tb'
import { Link } from 'react-router'

import clsx from 'clsx'
import { Heart, ShoppingCart } from 'lucide-react'

import { ROUTES } from '@/shared/config'

import s from './mobileNavBar.module.scss'

export function MobileNavBar() {
  return (
    <div className={clsx(s['mobile-navbar'], 'visible-tablet')}>
      <ul className={s['mobile-navbar__list']}>
        <li className={s['mobile-navbar__item']}>
          <Link to={ROUTES.home} className={s['mobile-navbar__link']}>
            <HiMiniHome size={24} className={s['mobile-navbar__icon']} />
          </Link>
        </li>
        <li className={s['mobile-navbar__item']}>
          <Link to={ROUTES.catalog} className={s['mobile-navbar__link']}>
            <TbListSearch
              strokeWidth={2.5}
              size={24}
              className={s['mobile-navbar__icon']}
            />
          </Link>
        </li>
        <li className={s['mobile-navbar__item']}>
          <Link to={ROUTES.profile.basket} className={s['mobile-navbar__link']}>
            <ShoppingCart
              fill="#fff"
              size={24}
              className={s['mobile-navbar__icon']}
            />
          </Link>
        </li>
        <li className={s['mobile-navbar__item']}>
          <Link to={ROUTES.profile.like} className={s['mobile-navbar__link']}>
            <Heart fill="#fff" size={24} className={s['mobile-navbar__icon']} />
          </Link>
        </li>
        <li className={s['mobile-navbar__item']}>
          <Link to={ROUTES.profile.root} className={s['mobile-navbar__link']}>
            <FaUser size={24} className={s['mobile-navbar__icon']} />
          </Link>
        </li>
      </ul>
    </div>
  )
}
