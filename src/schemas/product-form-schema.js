import { z } from "zod";

export const addProductSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Max 200 characters"),
  category: z.enum(["fruits", "vegetables"], {
    errorMap: () => ({ message: "Category must be fruits or vegetables" }),
  }),
  description: z
    .string()
    .min(1, "Description is required")
    .max(200, "Max 200 characters"),
  price: z
    .number()
    .gt(0, "Price must be greater than 0")
    .max(100000, "Price too high"),
  discount: z
    .number()
    .min(0, "Discount must be at least 0")
    .max(100, "Discount cannot exceed 100"),
  image: z
    .string()
    .max(200, "Max 200 characters")
    .regex(/(https?:\/\/.*\.(?:png|gif|webp|jpeg|jpg))/, "Invalid image URL")
    .nullable()
    .optional(),
  stock: z
    .number()
    .gt(0, "Stock must be greater than 0")
    .max(10000, "Stock too high"),
});

export const updateProductSchema = z.object({
  id: z.string().min(1, "Product ID is required"),
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Max 200 characters")
    .optional(),
  category: z.enum(["fruits", "vegetables"]).optional(),
  description: z.string().max(200, "Max 200 characters").optional(),
  price: z.number().gt(0).max(100000).optional(),
  discount: z.number().min(0).max(100).optional(),
  image: z
    .string()
    .max(200)
    .regex(/(https?:\/\/.*\.(?:png|gif|webp|jpeg|jpg))/, "Invalid image URL")
    .nullable()
    .optional(),
  stock: z.number().gt(0).max(10000).optional(),
});
