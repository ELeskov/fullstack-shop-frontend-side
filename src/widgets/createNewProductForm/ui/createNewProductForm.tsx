import { useEffect, useMemo } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { LoaderCircle } from 'lucide-react'
import z from 'zod'

import { useGetMeAllCategories, useGetMeAllColors } from '@/shared/api'
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from '@/shared/api/product'
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
import { GroupedOptionsEditor } from '@/shared/ui/productFormOptionsList'

import s from './createNewProductForm.module.scss'

const MAX_FILES = 10
const MAX_SIZE_MB = 10

const schema = z
  .object({
    id: z.string().optional(),
    title: z.string().min(1, 'Название обязательно'),
    price: z
      .number('Значение должно быть числом')
      .min(1, 'Цена должна быть больше 0'),
    categoryId: z.string().min(1, 'Выберите категорию'),
    colorId: z.string().optional(),
    description: z.string().min(1, 'Описание обязательно'),

    existingImages: z.array(z.string()).default([]),

    images: z
      .array(z.instanceof(File, { message: 'Файл должен быть изображением' }))
      .max(MAX_FILES, `Максимум ${MAX_FILES} изображений`)
      .default([]),

    groupedOptions: z
      .array(
        z.object({
          groupName: z.string().min(1, 'Название группы обязательно'),
          options: z
            .array(
              z.object({
                name: z.string().min(1, 'Название характеристики обязательно'),
                value: z.string().min(1, 'Значение обязательно'),
              }),
            )
            .min(1, 'Добавьте хотя бы одну характеристику'),
        }),
      )
      .default([]),
  })
  .refine(
    (data) => {
      return data.existingImages.length + data.images.length > 0
    },
    {
      message: 'Добавьте хотя бы одно изображение',
      path: ['images'],
    },
  )

type ProductSchema = z.infer<typeof schema>

interface ICreateNewProductForm {
  editData?: ProductSchema | null
}

export function CreateNewProductForm({ editData }: ICreateNewProductForm) {
  const isEditing = !!editData?.id

  const defaultValues = useMemo<ProductSchema>(
    () => ({
      title: editData?.title ?? '',
      price: editData?.price ?? 1,
      categoryId: editData?.categoryId ?? '',
      colorId: editData?.colorId ?? '',
      description: editData?.description ?? '',
      images: [],
      groupedOptions: editData?.groupedOptions ?? [],
      existingImages: editData?.existingImages ?? [],
    }),
    [editData],
  )

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ProductSchema, any, ProductSchema>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onTouched',
  })
  const { data: categories, isPending: isCreating } = useGetMeAllCategories()
  const { data: colors, isPending: isUpdating } = useGetMeAllColors()

  const { mutateAsync: createProduct } = useCreateProductMutation()
  const { mutateAsync: updateProduct } = useUpdateProductMutation()

  const isBusy = isCreating || isUpdating

  const currentExistingImages = watch('existingImages')

  const onSubmit: SubmitHandler<ProductSchema> = async (data) => {
    const formData = new FormData()

    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('price', data.price.toString())
    formData.append('categoryId', data.categoryId)

    if (data.colorId) {
      formData.append('colorId', data.colorId)
    }

    if (data.groupedOptions && data.groupedOptions.length > 0) {
      formData.append('groupOptions', JSON.stringify(data.groupedOptions))
    }

    if (data.images && data.images.length > 0) {
      data.images.forEach((file) => {
        formData.append('files', file)
      })
    }

    if (isEditing && data.existingImages && data.existingImages.length > 0) {
      formData.append('existingImages', JSON.stringify(data.existingImages))
    }

    if (isEditing) {
      await updateProduct({ productId: editData.id!, formData })
    } else {
      await createProduct(formData)
      reset()
    }
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
                    existingImages={currentExistingImages}
                    onRemoveExisting={(index) => {
                      const updated = [...currentExistingImages]
                      updated.splice(index, 1)
                      setValue('existingImages', updated, {
                        shouldValidate: true,
                      })
                    }}
                    onClearAll={() => {
                      setValue('images', [], { shouldValidate: true })
                      setValue('existingImages', [], { shouldValidate: true })
                    }}
                    maxSizeMB={MAX_SIZE_MB}
                    maxFiles={MAX_FILES}
                    accept="image/png,image/jpeg,image/webp"
                    disabled={isBusy}
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
                disabled={isBusy}
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
                disabled={isBusy}
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
                name="categoryId"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    name="product-category"
                    disabled={isBusy}
                  >
                    <SelectTrigger id="product-category">
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>

                    <SelectContent>
                      {isCreating ? (
                        <div className="flex justify-center">
                          <LoaderCircle className="animate-spin" />
                        </div>
                      ) : (
                        categories?.map(({ title, id }) => (
                          <SelectItem key={id} value={id}>
                            {title}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.categoryId && (
                <FieldError>{errors.categoryId.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="product-color">Цвет</FieldLabel>
              <Controller
                control={control}
                name="colorId"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    name="product-color"
                    disabled={isBusy}
                  >
                    <SelectTrigger id="product-color">
                      <SelectValue placeholder="Выберите цвет" />
                    </SelectTrigger>
                    <SelectContent>
                      {isUpdating ? (
                        <div className="flex justify-center">
                          <LoaderCircle className="animate-spin" />
                        </div>
                      ) : (
                        colors?.map(({ title, value, id }) => (
                          <SelectItem key={id} value={id}>
                            <span
                              style={{ backgroundColor: value }}
                              className={`aspect-square w-5 h-5 rounded-[50%]`}
                            ></span>
                            {title}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.colorId && (
                <FieldError>{errors.colorId.message}</FieldError>
              )}
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
                disabled={isBusy}
              />
            )}
          />
          {errors.description && (
            <FieldError>{errors.description.message}</FieldError>
          )}
        </FieldGroup>

        <FieldSet>
          <GroupedOptionsEditor<ProductSchema>
            control={control}
            register={register}
            name="groupedOptions"
            error={errors.groupedOptions}
            disabled={isBusy}
          />
        </FieldSet>

        <Field orientation="horizontal">
          <CustomButton
            className={clsx('rich-btn', 'rich-btn--blue')}
            variant="secondary"
            type="submit"
            disabled={isBusy}
          >
            {submitLabel}
          </CustomButton>

          <CustomButton
            className={clsx('rich-btn', 'rich-btn--danger')}
            type="button"
            variant="destructive"
            onClick={() => reset(defaultValues)}
            disabled={isBusy}
          >
            Сбросить
          </CustomButton>
        </Field>
      </FieldGroup>
    </form>
  )
}
