import { EllipsisVertical, Package, Star } from 'lucide-react'

import { ProfileHeader } from '@/widgets/profileHeader'

import { useGetMeShops } from '@/shared/api/shop/useGetMeShops'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/components/ui/dropdown-menu'

import s from './myShopsPage.module.scss'

export function MyShopsPage() {
  const { data: shops } = useGetMeShops()

  return (
    <div className={s['my-shops-page']}>
      <ProfileHeader title="Мои магазины" />
      <div className={s['my-shops-page__content']}>
        {shops?.map(({ title, picture, description, updatedAt, id }) => (
          <Card key={id} className={s['shop-card']}>
            <CardHeader className={s['shop-card__header']}>
              <div className={s['shop-card__titleBlock']}>
                <div className={s['shop-card__title']}>{title}</div>
                <Badge className="bg-blue-950 text-blue-400">Активен</Badge>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <EllipsisVertical size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Редактировать</DropdownMenuItem>
                  <DropdownMenuItem>Скопировать ссылку</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-400">
                    Удалить
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className={s['shop-card__content']}>
              <Avatar className="h-30 w-30 aspect-square">
                <AvatarImage
                  src={picture}
                  alt={`Логотип магазина ${title}`}
                  className="object-cover select-none"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className={s['meta']}>
                <div className={s['meta__desc']}>{description}</div>
              </div>
            </CardContent>
            <CardFooter className={s['shop-card__footer']}>
              <div className={s['metrics']}>
                <span className={s['metric']}>
                  <Package size={17} className="text-emerald-500" /> 41
                </span>
                <span className={s['metric']}>
                  <Star size={17} className="text-yellow-400" /> 41
                </span>
              </div>
              <div className={s['meta__date']}>
                Обновлён: {new Date(updatedAt).toLocaleDateString()}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
