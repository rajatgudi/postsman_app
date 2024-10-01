import { z } from "zod";
export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(3, "Password must be atleast 3 characters long"),
});

export type LoginType = z.infer<typeof LoginSchema>;

export const SignUpSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(3, "Password must be atleast 3 characters long"),
    confirmPassword: z.string().optional(),
    name: z.string(),
    username: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords dont match",
    path: ["confirmPassword"],
  });

export type SignUpType = z.infer<typeof SignUpSchema>;
