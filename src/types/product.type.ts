export interface Product {
  id?: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating?: {
    rate: number
    count: number
  }
}

export interface ProductState {
  products: Product[]
  selectedProduct: Product | null
  isLoading: boolean
  selectedDelete: number | null
}
