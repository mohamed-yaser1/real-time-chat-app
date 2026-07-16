import z from "zod";

export const createMessageSchema = z.object({
    chatId:z.string().trim().min(1),
    content:z.string().trim().optional(),
    image:z.string().trim().optional(),
    replyToId:z.string().trim().optional()
}).refine((data) => data.content || data.image , {
    message:"either content or image should b provided",
    path:["content"]
})