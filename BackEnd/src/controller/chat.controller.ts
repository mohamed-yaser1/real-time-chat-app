import {  Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { createChatSchema } from "../validators/chat.validator";
import { HTTPSTATUS } from "../config/http.config";
import { createChatService } from "../services/chat.service";


export const createChatController = asyncHandler(async(req:Request,res:Response) => {
    const userId = req.user?._id 
    const body = createChatSchema.parse(req.body);

    const chat = await createChatService(userId,body)

    return res.status(HTTPSTATUS.CREATED).json({
        message:'chat created successfully',
        chat
    })
})