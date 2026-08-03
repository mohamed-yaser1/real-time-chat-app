import {Server as HttpServer} from 'http'
import {Server, Socket} from 'socket.io'
import { Env } from '../config/env.config';
import jwt from 'jsonwebtoken'
import { validateChatParticipants } from '../services/chat.service';

interface AuthenticatedSocket extends Socket{
    userID?:string
}

let io:Server|null = null;
const onlineUsers  = new Map<string,string>();

export const initializeSocket = (HttpServer:HttpServer) => {
    io = new Server(HttpServer,{
        cors:{
            origin:Env.FRONTEND_ORIGIN,
            methods:['GET','POST'],
            credentials:true
        }
    })

    io.use(async(socket:AuthenticatedSocket,next) => {
        try {
            const cookie = socket.handshake.headers.cookie;
            if(!cookie) return next(new Error('unauthorized'));
            
            const token = cookie?.split('=')?.[1]?.trim();
            if(!token) return next(new Error('unauthorized'));
            
            const decodedToken = jwt.verify(token,Env.JWT_SECRET) as {userId:string}
            if(!decodedToken) return next(new Error('unauthorized'));
    
            socket.userID = decodedToken.userId;
            next();
            
        } catch (error) {
            next(new Error('internal server error'))
        }

    });

    io.on("connection",(socket:AuthenticatedSocket) => {
        const userId = socket.userID;
        const newSocketId = socket.id
        if (!userId) {
            socket.disconnect(true);
            return;
        }
        console.log('socket connected ',userId , newSocketId);

        onlineUsers.set(userId,newSocketId);

        io?.emit("online:users",Array.from(onlineUsers.keys()));

        socket.join(`user: ${userId}`);

        socket.on('chat:join',async (chatId:string,callback?:(err?:string) => void) => {
            try{
                await validateChatParticipants(chatId,userId);
                socket.join(`chat:${chatId}`);
                callback?.();
            }
            catch(err){
                callback?.('Error joining Chat')
            }
        })

        socket.on('chat:leave' , (chatId:string) => {
            socket.leave(`chat:${chatId}`);
            console.log(`user ${userId} has left the chat ${chatId}`)
        })

        socket.on('dissconnect' , () => {
            if(onlineUsers.get(userId) === newSocketId) onlineUsers.delete(userId);

            io?.emit('online:users',Array.from(onlineUsers.keys()));
            console.log(`socket dissconnected ${userId} ${newSocketId}`)
        })
    })

}