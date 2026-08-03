import 'dotenv/config'
import express, { NextFunction, Request,Response } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import http from 'http'
import passport from 'passport'
import { Env } from './config/env.config';
import { asyncHandler } from './middlewares/asyncHandler.middleware';
import { HTTPSTATUS } from './config/http.config';
import { errorHandler } from './middlewares/errorHandler.middleware';
import { connectDb } from './config/database.config';
import './config/passport.config'
import routes from './routes/index'
const app = express();
const server = http.createServer(app)

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:Env.FRONTEND_ORIGIN,
    credentials:true
}))
app.use(passport.initialize())

app.get('/',asyncHandler(async (req:Request,res:Response,next:NextFunction) => {
    res.status(HTTPSTATUS.OK).json({
        message:'server is healthy',
        status:'ok'
    })
} ))

app.use('/api',routes)


app.use(errorHandler);


server.listen(Env.PORT,() => {
    console.log(`running on port ${Env.PORT}`)
    connectDb();
})
