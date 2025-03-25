<script setup lang="ts">
import { ref, watch } from 'vue'
import { useForm, Field, ErrorMessage } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { productSchema, type ProductFormData } from '../../validations/product.schema'
// @ts-ignore
import Button from '../common/Button.vue'

interface Props {
  initialData?: Partial<ProductFormData>
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  initialData: () => ({
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
  }),
  isLoading: false,
})

const emit = defineEmits<{
  submit: [data: ProductFormData]
}>()

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: toTypedSchema(productSchema),
  initialValues: props.initialData,
})

const formData = ref<ProductFormData>({
  title: props.initialData.title || '',
  price: props.initialData.price || 0,
  description: props.initialData.description || '',
  category: props.initialData.category || '',
  image: props.initialData.image || '',
})

// Watch for changes in initial data
watch(
  () => props.initialData,
  (newData) => {
    formData.value = {
      title: newData.title || '',
      price: newData.price || 0,
      description: newData.description || '',
      category: newData.category || '',
      image: newData.image || '',
    }
  },
  { deep: true },
)

const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <div>
      <label for="title" class="block mb-2">{{ $t('product.title') }}</label>
      <Field
        name="title"
        type="text"
        v-model="formData.title"
        class="w-full p-2 border rounded"
        :class="{ 'border-red-500': errors.title }"
      />
      <ErrorMessage name="title" class="text-red-500 text-sm mt-1" />
    </div>

    <div>
      <label for="price" class="block mb-2">{{ $t('product.price') }}</label>
      <Field
        name="price"
        type="number"
        v-model="formData.price"
        class="w-full p-2 border rounded"
        :class="{ 'border-red-500': errors.price }"
      />
      <ErrorMessage name="price" class="text-red-500 text-sm mt-1" />
    </div>

    <div>
      <label for="description" class="block mb-2">{{ $t('product.description') }}</label>
      <Field
        name="description"
        as="textarea"
        v-model="formData.description"
        class="w-full p-2 border rounded"
        :class="{ 'border-red-500': errors.description }"
      />
      <ErrorMessage name="description" class="text-red-500 text-sm mt-1" />
    </div>

    <div>
      <label for="category" class="block mb-2">{{ $t('product.category') }}</label>
      <Field
        name="category"
        type="text"
        v-model="formData.category"
        class="w-full p-2 border rounded"
        :class="{ 'border-red-500': errors.category }"
      />
      <ErrorMessage name="category" class="text-red-500 text-sm mt-1" />
    </div>

    <div>
      <label for="image" class="block mb-2">{{ $t('product.image_url') }}</label>
      <Field
        name="image"
        type="url"
        v-model="formData.image"
        class="w-full p-2 border rounded"
        :class="{ 'border-red-500': errors.image }"
      />
      <ErrorMessage name="image" class="text-red-500 text-sm mt-1" />
    </div>

    <div class="flex justify-end space-x-4">
      <Button
        type="button"
        :isLoading="isSubmitting || props.isLoading"
        @click="$router.push('/berries')"
        variant="secondary"
      >
        {{ $t('common.cancel') }}
      </Button>
      <Button type="submit" :isLoading="isSubmitting || props.isLoading">
        {{ $t('common.submit') }}
      </Button>
    </div>
  </form>
</template>
