import z from 'zod'

export const furnitureSchema = z.object({
    name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(50, { message: "Name must not exceed 50 characters" }),
    color: z
    .string()
    .min(3, { message: "Color must be at least 3 characters" })
    .max(30, { message: "Color must not exceed 50 characters" }),
    type: z
    .string()
    .min(4, { message: "Type must be at least 3 characters" })
    .max(30, { message: "Type must not exceed 50 characters" }),
    dailyRate: z
    .number()
    .min(0.25, { message: "Daily rate must be at least 0.25" }),
    stock: z.number().min(1, { message: "Stock must be at least 1" }),
})