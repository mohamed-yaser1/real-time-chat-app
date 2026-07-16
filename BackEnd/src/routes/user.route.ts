import { Router } from "express";
import { passportAuthenticateJwt } from "../config/passport.config";
import { getUsers } from "../controller/user.controller";

const userRouter = Router()
    .use(passportAuthenticateJwt)
    .get('/all',getUsers)

    export default userRouter;