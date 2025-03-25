<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../../stores/product.store'
import ProductForm from '@/components/product/ProductForm.vue'
import Skeleton from '@/components/common/Skeleton.vue'
import type { ProductFormData } from '@/validations/product.schema'
import { useToast } from 'vue-toast-notification'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const toast = useToast()

const productData = ref<ProductFormData | null>(null)
const isLoading = ref(true)

onMounted(async () => {
  try {
    const productId = Number(route.params.id)
    productData.value = await productStore.fetchProductById(productId)
  } catch (error) {
    toast.error('Failed to load product')
    console.error(error)
  } finally {
    isLoading.value = false
  }
})

const updateProduct = async (data: ProductFormData) => {
  try {
    const productId = Number(route.params.id)
    await productStore.updateProduct(productId, data)
    toast.success('Berry updated successfully')
    router.push('/berries')
  } catch (error) {
    toast.error('Failed to update product')
    console.error(error)
  }
}
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">{{ $t('product.edit.title') }}</h1>

    <Skeleton v-if="isLoading" />

    <ProductForm
      v-else-if="productData"
      :is-loading="productStore.isLoading"
      :initial-data="productData"
      @submit="updateProduct"
    />

    <div v-else class="text-red-500">
      {{ $t('product.not_found') }}
    </div>
  </div>
</template>
