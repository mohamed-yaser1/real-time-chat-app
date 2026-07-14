import { NextFunction, Request , Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { loginSchema, signupSchema } from "../validators/authValidator";
import { loginService, signupService } from "../services/authService";
import { clearJwtAuthCookie, setJwtAuthCookie } from "../utils/cookie";
import { HTTPSTATUS } from "../config/http.config";


export const signUp = asyncHandler(async (req:Request,res:Response) => {
    
    const body = signupSchema.parse(req.body);
    const user = await signupService(body);
    const userId = user._id.toString();

    setJwtAuthCookie({res,userId})
    return res.status(HTTPSTATUS.CREATED).json({
        message:'User created successfully',
        user
    })
})

export const loginController = asyncHandler(async (req:Request,res:Response,next:NextFunction) => {
    const body = loginSchema.parse(req.body);
    const user = await loginService(body);
    const userId = user.id as string
    return setJwtAuthCookie({
        res,
        userId
    }).status(HTTPSTATUS.OK)
      .json({
        message:"login successfully",
        user
      })
})

export const logOutController = asyncHandler(async(req:Request,res:Response,next:NextFunction) => {
    return clearJwtAuthCookie(res).status(HTTPSTATUS.OK).json({
        message:'User logged Out successfully'
    })
})

export const authStatusController = asyncHandler(async (req:Request,res:Response,next:NextFunction) => {
    const user = req.user;
    return res.status(HTTPSTATUS.OK).json({
        message:"Authenticated User",
        user
    })

})