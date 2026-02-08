import { type SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import { FieldGroup, FieldSet } from '@/shared/ui/components/ui/field'

import s from './createCategoryForm.module.scss'

const schema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  description: z.string(),
})

type CategorySchema = z.infer<typeof schema>

interface ICreateCategoryForm {
  editData?: CategorySchema | null
}

export function CreateCategoryForm({ editData }: ICreateCategoryForm) {
  const { handleSubmit, reset } = useForm<CategorySchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: editData?.description ?? '',
      title: editData?.title ?? '',
    },
  })

  const onSubmit: SubmitHandler<CategorySchema> = (data) => {
    console.log(data)
    reset()
  }

  return (
    <div className={s['create-category-form']}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet></FieldSet>
        </FieldGroup>
      </form>
    </div>
  )
}
