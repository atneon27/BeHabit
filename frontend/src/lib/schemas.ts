import { z } from "zod";

const UserSignupFormSchema = z.object({
    email: z.string().email({
        message: "Use a valid email format"
    }),
    username: z.string().min(3, {message: "Username must be at least 3 characters long" })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" }),
    password: z.string().min(8, {message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/(?=.*[!@#$%^&*])/, { message: "Password must contain at least one special character" })
});

const UserSigninFormSchema = z.object({
    username: z.string().min(3, {message: "Username must be at least 3 characters long" })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" }),
    password: z.string().min(8, {message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/(?=.*[!@#$%^&*])/, { message: "Password must contain at least one special character" })
});

const HabitSchema = z.object({
    name: z.string().min(3, {message: "Name must be at least 3 characters long" }),
    description: z.string().min(3, {message: "Description must be at least 3 characters long" })
});

const ItemSchema = z.object({
    name: z.string().min(3, {message: "Name must be at least 3 characters long" }),
    description: z.string().min(3, {message: "Description must be at least 3 characters long" })
});

export {
    UserSignupFormSchema,
    UserSigninFormSchema,
    HabitSchema,
    ItemSchema
}