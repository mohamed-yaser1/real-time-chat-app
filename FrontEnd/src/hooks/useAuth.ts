import { API } from "@/lib/asiosInstance";
import type { LoginPayload, RegisterPayload, User } from "@/types/auth.type";
import { create } from "zustand";

interface AuthState {
    user:User | null;
    isLogginingIn:boolean;
    isSigningUp:boolean;
    isAuthStatusLoading:boolean;
    register:(data:RegisterPayload) => void
    login:(data:LoginPayload) => void
    logout:() => void
}

export const useAuth = create<AuthState>((set) => ({
    user:null,
    isSigningUp:false,
    isLogginingIn:false,
    isAuthStatusLoading:false,

    register:async(data:RegisterPayload) => {
        set({isSigningUp:true});
        try{
            const response = await API.post("/auth/register",data);
            set({user:response.data.user})
        }
        catch(err){
            console.log(err)
        }
    },
    login:async(data:LoginPayload) => {

    },
    logout:async() => {

    },

}))