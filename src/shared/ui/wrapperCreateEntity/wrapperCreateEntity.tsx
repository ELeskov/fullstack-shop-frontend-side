import type { UseQueryResult } from '@tanstack/react-query'

import { ScrollArea } from '../components/ui/scroll-area'
import { CustomButton } from '../customButton'

import s from './wrapperCreateEntity.module.scss'

interface IWrapperCreateEntity {
  children: React.ReactNode
  useHandleCreateEntity: UseQueryResult<any>
}

export function WrapperCreateEntity({
  children,
  useHandleCreateEntity,
}: IWrapperCreateEntity) {
  const { mutateAsync } = useHandleCreateEntity()
  return (
    <section className={s['wrapper-create-entity']}>
      <div className={s['wrapper-create-entity__content']}>
        <div className={s['wrapper-create-entity__header']}>
          <CustomButton onClick={mutateAsync}>Создать</CustomButton>
        </div>
        <ScrollArea>
          <div className={s['wrapper-create-entity__body']}>{children}</div>
        </ScrollArea>
        <div className={s['wrapper-create-entity__footer']}></div>
      </div>
    </section>
  )
}
