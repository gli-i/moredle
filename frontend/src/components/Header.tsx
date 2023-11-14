import { useContext } from "react"
import { Link } from "react-router-dom"
import { GlobalContext, GlobalStateType } from "../globalState";

interface propType {
    pageType: string
}

export default function Header(props: propType) {
    const data = useContext<GlobalStateType>(GlobalContext)
    return (
        <>
            <div className="w-full flex justify-around gap-10 border-b-2 border-black">
                <div className="w-1/4"></div>
                <div className="w-1/4 text-center flex flex-col justify-center text-xl md:text-2xl md:p-1 lg:text-3xl lg:p-3 font-bold">
                    <a href="/">Moredle</a>
                </div>

                <div className="w-1/4 flex items-center gap-4">
                    <Link to={'/sign-up'} className="w-1/4 flex justify-center items-center h-1/2 bg-blue-500 text-white rounded-sm cursor-pointer">Sign up</Link>
                    <Link to={'/login'} className="w-1/4 flex justify-center items-center h-1/2 bg-blue-500 text-white rounded-sm cursor-pointer">Login</Link>
                    {
                        data.isAdmin && 
                        <Link to={'/admin'} className="w-1/4 flex justify-center items-center h-1/2 bg-red-400 text-white rounded-sm cursor-pointer">Admin</Link>
                    }
                </div>
            </div>
        </>
    )
}