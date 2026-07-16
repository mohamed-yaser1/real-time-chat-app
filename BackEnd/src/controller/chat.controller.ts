import {  Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { createChatSchema } from "../validators/chat.validator";
import { HTTPSTATUS } from "../config/http.config";
import { createChatService, getSingleChatService, getUsersChatsService } from "../services/chat.service";


export const createChatController = asyncHandler(async(req:Request,res:Response) => {
    const userId = req.user?._id 
    const body = createChatSchema.parse(req.body);

    const chat = await createChatService(userId,body)

    return res.status(HTTPSTATUS.CREATED).json({
        message:'chat created successfully',
        chat
    })
})

export const getUsersChatsController = asyncHandler(async (req:Request,res:Response) => {
    const userId = req.user?._id;
    const chats = await getUsersChatsService(userId)

    return res.status(HTTPSTATUS.OK).json({
        message:"users Chat retrieved successfully",
        chats
    })
})

export const getSingleChatController = asyncHandler(async (req:Request,res:Response) => {
    const userId = req.user?._id;
    const {chatId} = req.params
    const {chat,messages} = await getSingleChatService(chatId as string,userId);

    return res.status(HTTPSTATUS.OK).json({
        message:'chat retrrieved successfully',
        chat,
        messages
    })
})  