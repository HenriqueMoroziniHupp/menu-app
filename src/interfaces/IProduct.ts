import type { ICategory } from './ICategory'
import type { IPrice } from './IPrice'

export type TProductStatus = 'ACTIVE' | 'OUTOFSTOCK' | 'INACTIVE'

export interface IProduct {
  id?: number
  idCategory?: number
  name?: string
  description?: string
  status?: TProductStatus
  category?: ICategory
  imageUrl?: string
  image?: File
  prices: IPrice[]
}

export interface IProdByCat {
  id: number
  name: string
  status: string
  products: IProduct[]
}
