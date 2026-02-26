import { useEffect, useMemo } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/shared/ui/components/ui/field'
import { Input } from '@/shared/ui/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/components/ui/select'
import { Textarea } from '@/shared/ui/components/ui/textarea'
import { CustomButton } from '@/shared/ui/customButton'
import { MultiPhotoUploader } from '@/shared/ui/multiPhotoUploader'
import { GroupedOptionsEditor } from '@/shared/ui/productFormOptionsList/productFormOptionsList'

import s from './createNewProductForm.module.scss'

const MAX_FILES = 10
const MAX_SIZE_MB = 10

const schema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  price: z
    .number('Значение должно быть числом')
    .min(1, 'Цена должна быть больше 0'),
  category: z.string().min(1, 'Выберите категорию'),
  color: z.string().min(1, 'Выберите цвет'),
  description: z.string(),
  images: z
    .array(z.instanceof(File, { message: 'Файл должен быть изображением' }))
    .min(1, 'Добавьте хотя бы одно изображение')
    .max(MAX_FILES, `Максимум ${MAX_FILES} изображений`),
})

type ProductSchema = z.infer<typeof schema>

interface ICreateNewProductForm {
  editData: ProductSchema | null
}

export function CreateNewProductForm({ editData }: ICreateNewProductForm) {
  const defaultValues = useMemo<ProductSchema>(
    () => ({
      title: editData?.title ?? '',
      price: editData?.price ?? 1,
      category: editData?.category ?? '',
      color: editData?.color ?? '',
      description: editData?.description ?? '',
      images: editData?.images ?? [],
    }),
    [editData],
  )

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<ProductSchema>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<ProductSchema> = (data) => {
    console.log(data)
    reset()
  }

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const submitLabel = editData ? 'Сохранить изменения' : 'Создать'

  return (
    <form
      className={s['create-new-product-form']}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <Field>
              <Controller
                name="images"
                control={control}
                render={({ field }) => (
                  <MultiPhotoUploader
                    value={field.value ?? []}
                    onChange={(files) => field.onChange(files ?? [])}
                    maxSizeMB={MAX_SIZE_MB}
                    maxFiles={MAX_FILES}
                    accept="image/png,image/jpeg,image/webp"
                    disabled={isSubmitting}
                  />
                )}
              />

              <FieldDescription>
                Загрузите картинки для вашего товара (до {MAX_FILES} шт и не
                более {MAX_SIZE_MB}MB каждая)
              </FieldDescription>

              {errors.images && (
                <FieldError>{errors.images.message}</FieldError>
              )}

              <div className="mt-2">
                <CustomButton
                  type="button"
                  onClick={() =>
                    setValue('images', [], { shouldValidate: true })
                  }
                  disabled={isSubmitting}
                >
                  Очистить изображения
                </CustomButton>
              </div>
            </Field>
          </FieldGroup>
        </FieldSet>

        <FieldSet>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field>
              <FieldLabel htmlFor="product-title">Название</FieldLabel>
              <Input
                {...register('title')}
                id="product-title"
                placeholder="Смартфон Apple iPhone 17 Pro 256 ГБ синий"
                type="text"
                disabled={isSubmitting}
              />
              {errors.title && <FieldError>{errors.title.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="product-price">Цена (руб)</FieldLabel>
              <Input
                {...register('price', { valueAsNumber: true })}
                id="product-price"
                type="number"
                placeholder="128 999 ₽"
                inputMode="numeric"
                min={1}
                step={1}
                disabled={isSubmitting}
              />
              {errors.price && <FieldError>{errors.price.message}</FieldError>}
            </Field>
          </FieldGroup>
        </FieldSet>

        <FieldSet>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field>
              <FieldLabel htmlFor="product-category">Категория</FieldLabel>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    name="product-category"
                    disabled={isSubmitting}
                  >
                    <SelectTrigger id="product-category">
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smartphones">Телефоны</SelectItem>
                      <SelectItem value="laptops">Ноутбуки</SelectItem>
                      <SelectItem value="tablets">Планшеты</SelectItem>
                      <SelectItem value="headphones">Наушники</SelectItem>
                      <SelectItem value="smartwatches">Смарт-часы</SelectItem>
                      <SelectItem value="accessories">Аксессуары</SelectItem>
                      <SelectItem value="audio">Аудиотехника</SelectItem>
                      <SelectItem value="tv">Телевизоры</SelectItem>
                      <SelectItem value="photo">Фото и видео</SelectItem>
                      <SelectItem value="gaming">Игры и приставки</SelectItem>
                      <SelectItem value="appliances">
                        Бытовая техника
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <FieldError>{errors.category.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="product-color">Цвет</FieldLabel>
              <Controller
                control={control}
                name="color"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    name="product-color"
                    disabled={isSubmitting}
                  >
                    <SelectTrigger id="product-color">
                      <SelectValue placeholder="Выберите цвет" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="black">Чёрный</SelectItem>
                      <SelectItem value="white">Белый</SelectItem>
                      <SelectItem value="silver">Серебристый</SelectItem>
                      <SelectItem value="space-gray">
                        Космический серый
                      </SelectItem>
                      <SelectItem value="gold">Золотой</SelectItem>
                      <SelectItem value="rose-gold">Розовое золото</SelectItem>
                      <SelectItem value="blue">Синий</SelectItem>
                      <SelectItem value="red">Красный</SelectItem>
                      <SelectItem value="green">Зелёный</SelectItem>
                      <SelectItem value="purple">Фиолетовый</SelectItem>
                      <SelectItem value="yellow">Жёлтый</SelectItem>
                      <SelectItem value="pink">Розовый</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.color && <FieldError>{errors.color.message}</FieldError>}
            </Field>
          </FieldGroup>
        </FieldSet>

        <FieldGroup>
          <FieldLabel htmlFor="product-description">Описание</FieldLabel>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <Textarea
                onChange={field.onChange}
                value={field.value}
                id="product-description"
                disabled={isSubmitting}
              />
            )}
          />
          {errors.description && (
            <FieldError>{errors.description.message}</FieldError>
          )}
        </FieldGroup>

        <Field orientation="horizontal">
          <CustomButton
            variant={'secondary'}
            type="submit"
            disabled={isSubmitting}
          >
            {submitLabel}
          </CustomButton>

          <CustomButton
            type="button"
            variant="destructive"
            onClick={() => reset(defaultValues)}
            disabled={isSubmitting}
          >
            Сбросить
          </CustomButton>
        </Field>
      </FieldGroup>

      <GroupedOptionsEditor />
    </form>
  )
}
