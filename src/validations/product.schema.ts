import * as zod from 'zod'

export const productSchema = zod.object({
  title: zod
    .string()
    .min(1, { message: 'Title is required' })
    .max(100, { message: 'Title must be less than 100 characters' }),
  price: zod.number().min(0.01, { message: 'Price must be greater than 0' }),
  description: zod
    .string()
    .min(1, { message: 'Description is required' })
    .max(500, { message: 'Description must be less than 500 characters' }),
  category: zod.string().min(1, { message: 'Category is required' }),
  image: zod.string().url({ message: 'Valid URL is required' }),
})

export type ProductFormData = zod.infer<typeof productSchema>
