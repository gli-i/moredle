import { useState, useEffect } from "react"
import { NavBar } from "../components/NavBar"
import Header from "../components/Header"

import { onAuthStateChanged } from "firebase/auth";
import { auth, getUser } from '../firebase';
import { DocumentData } from "firebase/firestore";

export default function Stats() {

    const [curUser, setCurUser] = useState<DocumentData | null>(null);

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in
              getUser(user.email!).then((data) => {
                setCurUser(data);
              });
            } else {
              setCurUser(null);
            }
          });
          
    }, [])
    
    return (
        <div className='h-screen flex flex-col'>

            <NavBar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
            <Header />

            <main className="w-[80vw] flex flex-col self-center">
                <div className="text-4xl font-semibold py-10">{curUser ? `${curUser.displayName}'s Stats`: 'Create an account to save your stats!'}</div>

                <div className="flex justify-between gap-10 text-center">

                    <div className="flex-1 border-4 border-greenlight">
                        <h3 className="bg-greenlight w-full text-2xl font-semibold py-4"> Classic </h3>

                        <ul className="p-6 text-lg flex flex-col gap-6">
                            <li> <b> Games Played: </b> {curUser ? curUser.classicGames ?? 'N/A' : 'N/A'} </li>
                            <li> <b> Games Won: </b> {curUser ? curUser.classicWins ?? 'N/A' : 'N/A'} </li>
                            <li> <b> Winrate: </b> {curUser ? Math.round(curUser.classicWins*10000/curUser.classicGames)/100 + '%' ?? 'N/A' : 'N/A'} </li>
                            <li> <b> Average Guesses / Game: </b> {curUser ? Math.round(curUser.classicAvg * 100)/100 ?? 'N/A' : 'N/A'} </li>
                        </ul>
                    </div>

                    <div className="flex-1 border-4 border-yellow-400">
                        <h3 className="bg-yellow-400 w-full text-2xl font-semibold py-4"> Timed </h3>

                        <ul className="p-6 text-lg flex flex-col gap-6">
                            <li> <b> Games Played: </b> {curUser ? curUser.timedGames ?? 'N/A' : 'N/A'} </li>
                            <li> <b> Top Score: </b> {curUser ? curUser.timedHigh ?? 'N/A' : 'N/A'} </li>
                            <li> <b> Average Score: </b> {curUser ? Math.round(curUser.timedAvg * 100)/100 ?? 'N/A' : 'N/A'} </li>
                        </ul>
                    </div>

                    <div className="flex-1 border-4 border-red-400">
                        <h3 className="bg-red-400 w-full text-2xl font-semibold py-4"> WIP </h3>

                        <ul className="p-6 text-lg flex flex-col gap-6">
                            <li> <b> Games Played: </b> {curUser ? curUser.blanksGames ?? 'N/A' : 'N/A'} </li>
                            <li> <b> Top Score: </b> {curUser ? curUser.blanksHigh ?? 'N/A' : 'N/A'} </li>
                            <li> <b> Average Score: </b> {curUser ? Math.round(curUser.blanksAvg * 100)/100 ?? 'N/A' : 'N/A'} </li>
                        </ul>
                    </div>
                </div>
            </main>
            
        </div>
    )
}