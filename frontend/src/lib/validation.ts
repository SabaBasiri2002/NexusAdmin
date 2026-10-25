import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),

  rememberMe: z.boolean(),
});
export const userSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name must be less than 50 characters."),

  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Email is invalid."),

  role: z.enum(["admin", "manager", "user"], {
    required_error: "Role is required.",
  }),

  status: z.enum(["active", "inactive"], {
    required_error: "Status is required.",
  }),
});
export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Product name is required.")
    .min(2, "Product name must be at least 2 characters.")
    .max(100, "Product name must be less than 100 characters."),

  price: z.coerce
    .number({
      required_error: "Price is required.",
    })
    .positive("Price must be greater than 0."),

  stock: z.coerce
    .number({
      required_error: "Stock is required.",
    })
    .int("Stock must be a whole number.")
    .min(0, "Stock cannot be negative."),

  status: z.enum(["active", "inactive"], {
    required_error: "Status is required.",
  }),

  category: z.enum(
    [
      "computers",
      "phones",
      "tablets",
      "audio",
      "wearables",
      "accessories",
      "displays",
    ],
    {
      required_error: "Category is required.",
    },
  ),
});

export type UserFormData = z.infer<typeof userSchema>;

export type LoginFormData = z.infer<typeof loginSchema>;

export type ProductFormData = z.infer<typeof productSchema>;

