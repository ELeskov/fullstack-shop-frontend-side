import type { SchemaGetBasketResponseDto } from '@/shared/api/api-endpoints'

export interface BasketStats {
  totalQuantity: number
  selectedQuantity: number
  totalPrice: number
  allSelected: boolean
}

/**
 * Вычисляет статистику корзины на основе данных
 * @param basket - Данные корзины (может быть null/undefined)
 * @returns Объект со статистикой (все значения 0 если basket нет)
 */
export const calculateBasketStats = (
  basket: SchemaGetBasketResponseDto | null | undefined,
): BasketStats => {
  if (!basket?.basketItems) {
    return {
      totalQuantity: 0,
      selectedQuantity: 0,
      totalPrice: 0,
      allSelected: false,
    }
  }

  const { basketItems } = basket

  return {
    totalQuantity: basketItems.reduce(
      (acc, { isSelected, quantity }) =>
        isSelected ? acc + quantity : acc + 0,
      0,
    ),
    selectedQuantity: basketItems.filter(item => item.isSelected).length,
    totalPrice: basketItems.reduce(
      (acc, { product, quantity, isSelected }) =>
        isSelected ? acc + product.price * quantity : acc + 0,
      0,
    ),
    allSelected:
      basketItems.length === basketItems.filter(item => item.isSelected).length,
  }
}
