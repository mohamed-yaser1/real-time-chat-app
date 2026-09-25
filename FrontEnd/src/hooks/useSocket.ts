import {io,Socket} from 'socket.io-client'
import {create} from 'zustand'

const Base_URL = import.meta.env.BASE_URL

interface SocketState {
    socket:Socket | null;
    onlineUsers:string[];
    connectSocket:()=>void;
    disConnectSocket:()=>void
}

export const useSocket = create<SocketState>((set,get) => ({
    socket:null,
    onlineUsers:[],
    connectSocket:() => {
        const {socket} = get();
        if(socket?.connected) return;

        const newSocket = io(Base_URL,{
            withCredentials:true,
            autoConnect:true
        });
        set({socket:newSocket});

        newSocket.on('online:users' , userIds => {
            set({onlineUsers:userIds})
        })
    },
    disConnectSocket:()=>{
        const {socket} = get()
        if(socket) {
            socket.disconnect();
            set({socket:null})
        }
    },
}))