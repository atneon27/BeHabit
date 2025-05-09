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

type UserSignupType = z.infer<typeof UserSignupSchema>;
type UserSigninType = z.infer<typeof UserSigninSchema>;

interface CustomRequest extends Request {
    userId?: string;
}

export {
    UserSignupSchema,
    UserSigninSchema,
    UserSignupType, 
    UserSigninType,
    CustomRequest
}