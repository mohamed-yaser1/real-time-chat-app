import AppWrapper from "@/components/AppWrapper"
import { Outlet } from "react-router-dom"

const AppLayOut = () => {
  return (
    <AppWrapper>
        <div className="h-full">
            <Outlet/>
        </div>
    </AppWrapper>
  )
}

export default AppLayOut