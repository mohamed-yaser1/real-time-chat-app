import { Router } from "express";
import { loginController , signUp , logOutController , authStatusController} from "../controller/authCintroller";
import { passportAuthenticateJwt } from "../config/passport.config";

const authRoutes = Router();

authRoutes.post('/login',loginController);
authRoutes.post('/signup',signUp)
authRoutes.get('/status',passportAuthenticateJwt , authStatusController);
authRoutes.post('/logout',passportAuthenticateJwt,logOutController)

export default authRoutes