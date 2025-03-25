<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product.store'
import ProductForm from '@/components/product/ProductForm.vue'
import type { ProductFormData } from '@/validations/product.schema'
import { useToast } from 'vue-toast-notification'

const router = useRouter()
const productStore = useProductStore()
const toast = useToast()

const initialData = ref<Partial<ProductFormData>>({
  title: '',
  price: 0,
  description: '',
  category: '',
  image: '',
})

const createProduct = async (data: ProductFormData) => {
  try {
    await productStore.addProduct(data)
    toast.success('Berry created successfully')
    router.push('/berries')
  } catch (error) {
    toast.error('Failed to create berry')
  }
}
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">{{ $t('product.create.title') }}</h1>

    <ProductForm
      :initial-data="initialData"
      @submit="createProduct"
      :is-loading="productStore.isLoading"
    />
  </div>
</template>
