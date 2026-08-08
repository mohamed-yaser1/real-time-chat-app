import BaseLayOut from "@/layouts/baseLayOut"
import { Route, Routes } from "react-router-dom"
import { authRoutesPaths, protectedRoutesPaths } from "./routes"
import AppLayOut from "@/layouts/appLayOut"
import RouteGuard from "./route-guard"

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<RouteGuard requiredAuth={false} />}>
                <Route element={<BaseLayOut/>}>
                    {authRoutesPaths.map(route => 
                        <Route key={route.path} path={route.path} element={route.element} />
                    )}
                </Route>
            </Route>
            {/* /////////// */}
            <Route path="/" element={<RouteGuard requiredAuth={true}/>}>
                <Route element={<AppLayOut/>}>
                    {protectedRoutesPaths.map(route => 
                        <Route key={route.path} path={route.path} element={route.element} />
                    )}
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRoutes