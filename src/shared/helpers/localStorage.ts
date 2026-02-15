import { LS_SELECTED_SHOP_ID } from '../constants'

export const loadSelectedShopId = () =>
  localStorage.getItem(LS_SELECTED_SHOP_ID)

export const saveSelectedShopId = (id: string) =>
  localStorage.setItem(LS_SELECTED_SHOP_ID, id)

export const clearSelectedShopId = () =>
  localStorage.removeItem(LS_SELECTED_SHOP_ID)
