import { useState, useContext, useEffect } from "react"
import { GlobalContext, GlobalStateType } from "../globalState"

import { NavBar } from "../components/NavBar"
import Header from "../components/Header"

export default function Admin() {
    const data = useContext<GlobalStateType>(GlobalContext);
    const [answer, setAnswer] = useState<string>("");

    const [response, setResponse] = useState<{ visible: Boolean, success: Boolean, message: string }>();

    async function sendChangeWordRequest() {
        try {
            const res = await fetch("https://0indrq4mb3.execute-api.us-east-1.amazonaws.com/Prod/changeAnswer", {
                method: "Post",
                body: JSON.stringify({ globalWord: answer }),
                credentials: "include"
            })

            const jsonRes = await res.json();

            if (res.ok) {
                setResponse({ visible: true, success: true, message: jsonRes.message })
            }
        } catch (error) {
            setResponse({ visible: true, success: false, message: 'error' });
        }
    }

    useEffect(() => {
        if (response) {
            const timer = setTimeout(() => { setResponse({ visible: false, success: false, message: '' }) }, 3000);
            return () => clearInterval(timer);
        }
    }, [response])

    return (
        <>
            <NavBar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
            <Header />
            <div className="w-screen">
                <div className="w-1/4 mx-auto mt-8 shadow-xl">
                    <div className="text-center font-bold text-xl">{data.isAdmin ? 'Change Answer' : 'Admins Only'}</div>
                    <div className="w-full flex flex-col justify-center mt-2">
                        <input className="w-3/4 mx-auto border-2 shadow-xl p-1" onChange={(e) => { setAnswer(e.target.value) }} value={answer} type="text" placeholder="New Answer" />
                        <div onClick={sendChangeWordRequest} className="p-2 border bg-blue-600 text-white w-1/2 mx-auto mt-2 text-center cursor-pointer rounded-lg mb-2 hover:bg-blue-300 transition-all">Submit</div>
                    </div>
                </div>
            </div>

            {
                response?.visible && (
                <div className="w-screen mt-4">
                    <div className={`flex justify-center items-center w-1/5 mx-auto h-20 shadow-2xl rounded-lg text-white ${response.success ? 'bg-green-300': 'bg-red-300'}`}>
                        <div className="w-full text-center">{response.message}</div>
                    </div>
                </div>)
            }
        </>
    )
}