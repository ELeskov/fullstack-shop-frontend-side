export interface IColor {
  id: string
  title: string
  value: string
  createdAt: string
  storeId: string
}

export type IColorCreate = Pick<IColor, 'title' | 'value'>
