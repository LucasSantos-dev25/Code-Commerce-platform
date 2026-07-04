import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string().min(3, 'Nome deve ter ao menos 3 caracteres'),
  description: z.string().min(10),
  price: z.number().positive('Preço deve ser positivo'),
  type: z.enum(['BASE', 'ADDON']),
  imageUrl: z.string().url().optional(),
})

export type CreateProductInput = z.infer<typeof createProductSchema>