import { Router } from "express";
import authRoutes from "./auth.route";
import chatRouter from "./chat.route";
import userRouter from "./user.route";

const router = Router();

router.use('/auth',authRoutes)
router.use('/chat',chatRouter)
router.use('/user',userRouter)

export default router;