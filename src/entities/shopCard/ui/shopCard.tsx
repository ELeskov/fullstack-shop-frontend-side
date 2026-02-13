import clsx from 'clsx'
import { Link2, Package, Pencil, Star, Trash2 } from 'lucide-react'
import { motion } from 'motion/react'

import type { SchemaShopResponseDto } from '@/shared/api/api-endpoints'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/ui/components/ui/avatar'
import { Badge } from '@/shared/ui/components/ui/badge'
import { Button } from '@/shared/ui/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/shared/ui/components/ui/card'

import s from './shopCard.module.scss'

export function ShopCard({ data }: { data: SchemaShopResponseDto }) {
  const { title, updatedAt, createdAt, picture } = data

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      <Card className={s['shop-card']}>
        <CardHeader className={s['shop-card__header']}>
          <div className={s['shop-card__titleBlock']}>
            <h2 className={s['shop-card__title']}>{title}</h2>
            <Badge className="bg-blue-950 text-blue-400">Выбран</Badge>
          </div>

          <div className={s['shop-card__header-action']}>
            <Button
              type="button"
              className={s['action-btn']}
              aria-label="Скопировать ссылку"
              title="Скопировать ссылку"
              onClick={() => {
                // замени на реальную ссылку
                const url = `${window.location.origin}/shop/${data.id}`
                navigator.clipboard.writeText(url)
              }}
            >
              <Link2 size={18} />
            </Button>

            <Button
              type="button"
              className={s['action-btn']}
              aria-label="Редактировать"
              title="Редактировать"
              onClick={() => {
                // сюда твой navigate/открытие модалки
                // navigate(ROUTES.profile.shops.edit(data.id))
              }}
            >
              <Pencil size={18} />
            </Button>

            <Button
              type="button"
              className={s['action-btn']}
              aria-label="Удалить"
              title="Удалить"
              data-variant="danger"
              onClick={() => {
                // сюда твой confirm + mutation delete
              }}
            >
              <Trash2 size={18} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className={s['shop-card__content']}>
          <Avatar className={s['shop-card__image-wrap']}>
            <AvatarImage
              src={picture}
              alt={`Логотип магазина ${title}`}
              className={s['shop-card__image']}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </CardContent>
        <CardFooter className={s['shop-card__footer']}>
          <div className={s['metrics']}>
            <Badge variant="secondary" className={s['metrics__badge']}>
              <div className={s['metric']}>
                <Package className="text-emerald-500 size-4.5! max-xl:size-4!" />
                <span className={clsx(s['metrics__label'], 'hidden-mobile')}>
                  Товаров
                </span>
              </div>
              <span className={clsx(s['metrics__value'], 'text-emerald-600')}>
                41
              </span>
            </Badge>

            <Badge variant="secondary" className={s['metrics__badge']}>
              <div className={s['metric']}>
                <Star className="text-yellow-400 size-4.5! max-xl:size-4!" />
                <span className={clsx(s['metrics__label'], 'hidden-mobile')}>
                  Рейтинг
                </span>
              </div>
              <span className={clsx(s['metrics__value'], 'text-yellow-300')}>
                4,6
              </span>
            </Badge>
          </div>
          <div className={s['meta__date']}>
            <div className="flex justify-end gap-2">
              <span>Создан:</span>
              <time>{new Date(createdAt).toLocaleDateString()}</time>
            </div>
            <div className="flex justify-between gap-2">
              <span>Обновлён:</span>
              <time>{new Date(updatedAt).toLocaleDateString()}</time>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
