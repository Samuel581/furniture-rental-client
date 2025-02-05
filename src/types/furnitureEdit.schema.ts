import z from 'zod'

export const editFurnitureSchema = z.object({
    name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(50, { message: "Name must not exceed 50 characters" })
    .optional(),
    color: z
    .string()
    .min(3, { message: "Color must be at least 3 characters" })
    .max(30, { message: "Color must not exceed 50 characters" })
    .optional(),
    type: z
    .string()
    .min(4, { message: "Type must be at least 3 characters" })
    .max(30, { message: "Type must not exceed 50 characters" })
    .optional(),
    dailyRate: z
    .coerce
    .number()
    .min(0.25, { message: "Daily rate must be at least 0.25" })
    .max(1000, { message: "Daily rate must not exceed 1000" })
    .optional(),
  stock: z
    .coerce
    .number()
    .min(1, { message: "Stock must be at least 1" })
    .optional(),
})