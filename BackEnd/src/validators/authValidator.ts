import z from "zod";


export const emailSchema = z
.string()
.trim()
.email('invalid email address');

export const passwordSchema = z
.string()
.trim()
.min(6,'password can not be less tyhan 6 chars');

export const signupSchema = z.object({
    name:z.string().trim().min(1),
    email:emailSchema,
    password:passwordSchema,
    avatar:z.string().optional()
})

export const loginSchema = z.object({
    email:emailSchema,
    password:passwordSchema
})

export type SignupSchemaType = z.infer<typeof signupSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>