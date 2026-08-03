import { Router } from "express";
import { getUsersChatsController ,createChatController , getSingleChatController } from "../controller/chat.controller";
import { passportAuthenticateJwt } from "../config/passport.config";
import { createMessageController } from "../controller/message.controller";

const chatRouter = Router()
 .use(passportAuthenticateJwt)
 .post("/create",createChatController)
 .post("/message/send",createMessageController)
 .get("all",getUsersChatsController)
 .get("/:chatId",getSingleChatController)


export default chatRouter;