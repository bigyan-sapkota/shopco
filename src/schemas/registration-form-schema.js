import z from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "../libs/constants";

export const registrationSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
    image: z
      .any()
      .refine((files) => files?.length > 0, "Image is required")
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported.",
      )
      .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE,
        "Image must be less than 2MB.",
      )
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
