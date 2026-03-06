import { useMemo } from 'react'
import { useParams } from 'react-router'

import { LoaderCircle } from 'lucide-react'

import { CreateNewProductForm } from '@/widgets/createNewProductForm'
import { ProfileHeader } from '@/widgets/profileHeader'

import { useGetProductById } from '@/shared/api/product/useGetProductById'

import s from './editProductPage.module.scss'

export function EditProductPage() {
  const { productId } = useParams<{ productId: string }>()

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductById(productId)

  const editData = useMemo(() => {
    if (!product) {
      return null
    }

    return {
      id: product.id,
      title: product.title,
      description: product.description ?? '',
      price: product.price,
      categoryId: product.categoryId,
      colorId: product.colorId ?? undefined,
      images: [],
      existingImages: product.images ?? [],
      groupedOptions:
        product.groupedOptions?.map((group) => ({
          groupName: group.groupName,
          options: group.options.map((option) => ({
            name: option.name,
            value: option.value,
          })),
        })) ?? [],
    }
  }, [product])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-100">
        <LoaderCircle className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="p-4 bg-red-50 text-red-500 rounded-lg">
        {error instanceof Error
          ? error.message
          : 'Произошла ошибка при загрузке товара'}
      </div>
    )
  }
  return (
    <div className={s['edit-shop-page']}>
      <ProfileHeader title="Редактировать товар" />
      <div className="mt-6">
        <CreateNewProductForm editData={editData} />
      </div>
    </div>
  )
}
