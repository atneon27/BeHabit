import { Request } from "express";
import { z } from "zod";

const UserSignupSchema = z.object({
    email: z.string().email(),
    username: z.string().min(3),
    password: z.string().min(8)
});

const UserSigninSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(8)
});

const HabitSchema = z.object({
    name: z.string(),
    description: z.string()
});

const ItemSchema = z.object({
    name: z.string(),
    description: z.string(),
});

type UserSignupType = z.infer<typeof UserSignupSchema>;
type UserSigninType = z.infer<typeof UserSigninSchema>;
type HabitType = z.infer<typeof HabitSchema>;
type ItemType = z.infer<typeof ItemSchema>;

interface CustomRequest extends Request {
    userId?: string;
}

export {
    UserSignupSchema,
    UserSigninSchema,
    HabitSchema,
    ItemSchema,
    UserSignupType, 
    UserSigninType,
    CustomRequest,
    HabitType,
    ItemType
}