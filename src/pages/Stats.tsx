import { useState, useEffect } from "react"
import { NavBar } from "../components/NavBar"
import Header from "../components/Header"

interface statsInterface {
    _id: string,
    classic_wins: number,
    timed_wins: number,
    words_guessed: number
}

//https://8mcqocvg10.execute-api.us-east-1.amazonaws.com/Prod


export default function Stats() {
    const [authorized, setAuthorization] = useState(false);
    const [classic_wins, setClassicWins] = useState(0);
    const [timed_wins, setTimedWins] = useState(0);
    const [words_guessed, setWordsGuessed] = useState(0);
    const [username, setUsername] = useState(''); 


    useEffect(() => {
        async function sendRequest() {
            try {
                const res = await fetch("https://0indrq4mb3.execute-api.us-east-1.amazonaws.com/Prod/getStats", {
                    method: "POST",
                    credentials: "include",
                })

                const json: statsInterface = await res.json();

                setAuthorization(true);
                
                setClassicWins(json.classic_wins);
                setTimedWins(json.timed_wins);
                setWordsGuessed(json.words_guessed);
                setUsername(json._id); 

            } catch (error) {
                setAuthorization(false);
                console.log(error);
            }
        }

        sendRequest();
    }, []);
    return (
        <div className='h-screen w-screen'>
            <NavBar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
            <Header />

            <div className=" text-8xl ml-20 font-bold">{authorized ? `${username}'s Stats`: 'Log in to view stats'}</div>

            {
            <div className="w-3/4 h-12 mx-auto flex justify-around gap-4 mt-12">
                <div className="flex flex-col h-20 hover:h-80 bg-orange-300 grow shadow-2xl border text-center text-white text-xl font-bold transition-all group duration-700">
                    <div>Classic Wins</div>
                    <div className="grow flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-500 text-6xl">{authorized ? `${classic_wins} Classic Wins`: 'N/A'}</div>
                </div>
                <div className="flex flex-col h-20 hover:h-80 bg-purple-500 grow shadow-2xl border text-center text-white text-xl font-bold transition-all group duration-700">
                    <div>Timed Wins</div>
                    <div className="grow flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-500 text-6xl">{authorized ? `${timed_wins} Timed Wins`: 'N/A'}</div>
                </div>
                <div className="flex flex-col h-20 hover:h-80 bg-green-800 grow shadow-2xl border text-center text-white text-xl font-bold transition-all group duration-700">
                    <div>Words Guessed</div>
                    <div className="grow flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-500 text-6xl">{authorized ? `${words_guessed} Words guessed`: 'N/A'}</div>
                </div>
            </div>
            }
        </div>
    )
}