import { Outlet } from "react-router-dom"

const BaseLayOut = () => {
  return (
    <div className="flex flex-col w-full h-auto ">
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full mx-auto h-auto">
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default BaseLayOut