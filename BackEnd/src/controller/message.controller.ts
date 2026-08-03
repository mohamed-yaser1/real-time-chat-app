import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { Request, Response } from "express";
import { createMessageSchema } from "../validators/message.validator";
import { HTTPSTATUS } from "../config/http.config";
import { createMessageService } from "../services/message.service";

export const createMessageController = asyncHandler(async(req:Request,res:Response) => {
    const userId = req.user?._id;
    const body = createMessageSchema.parse(req.body)

    const result = await createMessageService(userId,body);

    return res.status(HTTPSTATUS.OK).json({
        message:"message created successfully",
        ...result
    })


})