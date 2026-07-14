import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";
import { getUsersService } from "../services/user.service";


export const getUsers = asyncHandler(async (req:Request , res:Response , next:NextFunction) => {
    const userId = req.user?._id;
    const users = await getUsersService(userId)
    return res.status(HTTPSTATUS.OK).json({
        message:'users retrieved successfully',
        users
    })
})