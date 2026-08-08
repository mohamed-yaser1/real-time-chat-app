import SignIn from "@/pages/auth/signIn"
import SignUp from "@/pages/auth/signUp"
import Chat from "@/pages/chat"
import SingleChat from "@/pages/chat/chatId"

export const AuthRoutes = {
    SIGN_IN:'/',
    SIGN_UP:'/sign-up'
}

export const protectedRoutes = {
    CHAT:'/chat',
    SINGLE_CHAT:"/chat:chatId"
}

export const authRoutesPaths = [
    {
        path:AuthRoutes.SIGN_IN,
        element:<SignIn/>
    },
    {
        path:AuthRoutes.SIGN_UP,
        element:<SignUp/>
    }
]

export const protectedRoutesPaths = [
    {
        path:protectedRoutes.CHAT,
        element:<Chat/>
    },
    {
        path:protectedRoutes.SINGLE_CHAT,
        element:<SingleChat/>
    }
]

export const isAuthRoute = (pathName:string) => {
    return Object.values(AuthRoutes).includes(pathName)
}