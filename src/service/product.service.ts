import { productApi } from './api'
import type { Product } from '../types/product.type'

export const getProducts = async (): Promise<Product[]> => {
  const response = await productApi.get<Product[]>('/products')
  return response.data
}

export const getProductById = async (id: number): Promise<Product> => {
  const response = await productApi.get<Product>(`/products/${id}`)
  return response.data
}

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const response = await productApi.post<Product>('/products', product)
  return response.data
}

export const updateProduct = async (id: number, product: Omit<Product, 'id'>): Promise<Product> => {
  const response = await productApi.put<Product>(`/products/${id}`, product)
  return response.data
}

export const deleteProduct = async (id: number): Promise<void> => {
  await productApi.delete(`/products/${id}`)
}
