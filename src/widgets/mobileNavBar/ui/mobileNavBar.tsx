import { Link } from 'react-router'

import clsx from 'clsx'
import { Heart, Home, Menu, ShoppingCart, UserRound } from 'lucide-react'

import { ROUTES } from '@/shared/config'

import s from './mobileNavBar.module.scss'

export function MobileNavBar() {
  return (
    <div className={clsx(s['mobile-navbar'], 'visible-mobile')}>
      <ul className={s['mobile-navbar__list']}>
        <li className={s['mobile-navbar__item']}>
          <Link to={ROUTES.home} className={s['mobile-navbar__link']}>
            <Home size={24} className={s['mobile-navbar__icon']} />
          </Link>
        </li>
        <li className={s['mobile-navbar__item']}>
          <Link to={ROUTES.catalog} className={s['mobile-navbar__link']}>
            <Menu size={24} className={s['mobile-navbar__icon']} />
          </Link>
        </li>
        <li className={s['mobile-navbar__item']}>
          <Link to={ROUTES.profile.basket} className={s['mobile-navbar__link']}>
            <ShoppingCart size={24} className={s['mobile-navbar__icon']} />
          </Link>
        </li>
        <li className={s['mobile-navbar__item']}>
          <Link to={ROUTES.profile.like} className={s['mobile-navbar__link']}>
            <Heart size={24} className={s['mobile-navbar__icon']} />
          </Link>
        </li>
        <li className={s['mobile-navbar__item']}>
          <Link to={ROUTES.profile.root} className={s['mobile-navbar__link']}>
            <UserRound size={24} className={s['mobile-navbar__icon']} />
          </Link>
        </li>
      </ul>
    </div>
  )
}
