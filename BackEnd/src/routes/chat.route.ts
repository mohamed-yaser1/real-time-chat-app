import { Router } from "express";
import { getUsersChatsController ,createChatController , getSingleChatController } from "../controller/chat.controller";
import { passportAuthenticateJwt } from "../config/passport.config";

const chatRouter = Router()
 .use(passportAuthenticateJwt)
 .post("/create",createChatController)
 .get("all",getUsersChatsController)
 .get("/:chatId",getSingleChatController)


export default chatRouter;