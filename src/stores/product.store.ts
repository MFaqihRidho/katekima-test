import { defineStore } from 'pinia'
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../service/product.service'
import type { ProductState, Product } from '../types/product.type'

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    products: [],
    selectedProduct: null,
    selectedDelete: null,
    isLoading: false,
  }),

  actions: {
    async fetchProducts() {
      this.isLoading = true
      try {
        const products = await getProducts()
        this.products = products
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        this.isLoading = false
      }
    },

    async fetchProductById(id: number) {
      this.isLoading = true
      try {
        const product = await getProductById(id)
        this.selectedProduct = product
        return product
      } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error)
        return null
      } finally {
        this.isLoading = false
      }
    },

    async addProduct(product: Omit<Product, 'id'>) {
      this.isLoading = true
      try {
        const newProduct = await createProduct(product)
        this.products.push(newProduct)
        return newProduct
      } catch (error) {
        console.error('Error adding product:', error)
        return null
      } finally {
        this.isLoading = false
      }
    },

    async updateProduct(id: number, product: Omit<Product, 'id'>) {
      this.isLoading = true
      try {
        const updatedProduct = await updateProduct(id, product)

        const index = this.products.findIndex((p) => p.id === id)
        if (index !== -1) {
          this.products[index] = updatedProduct
        }

        return updatedProduct
      } catch (error) {
        console.error(`Error updating product with id ${id}:`, error)
        return null
      } finally {
        this.isLoading = false
      }
    },

    async removeProduct(id: number) {
      this.isLoading = true
      try {
        await deleteProduct(id)
        this.products = this.products.filter((product) => product.id !== id)
        return true
      } catch (error) {
        console.error(`Error deleting product with id ${id}:`, error)
        return false
      } finally {
        this.isLoading = false
      }
    },

    setSelectedDeleteProduct(product: number | null) {
      this.selectedDelete = product
    },
  },
})
