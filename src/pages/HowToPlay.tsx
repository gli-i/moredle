import { useState } from "react";

import { NavBar } from "../components/NavBar";
import Header from "../components/Header";
import LetterBox from "../components/LetterBox";

import { cellValueInterface } from "../logic/baseWordle";

export default function HowToPlay(){
    const [open, setOpen] = useState<string>("classic")

    const greenExample:cellValueInterface[] = [
        {letter:"A", value:2},
        {letter:"P", value:0},
        {letter:"P", value:0},
        {letter:"L", value:0},
        {letter:"E", value:0},
    ]

    const yellowExample:cellValueInterface[] = [
        {letter:"F", value:0},
        {letter:"A", value:0},
        {letter:"I", value:0},
        {letter:"R", value:1},
        {letter:"Y", value:0},
    ]

    const dgreyExample:cellValueInterface[] = [
        {letter:"B", value:0},
        {letter:"L", value:3},
        {letter:"U", value:0},
        {letter:"E", value:0},
        {letter:"S", value:0},
    ]

    return (

    <div className='h-screen flex flex-col justify-between gap-1'>
        <NavBar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />

        <Header />

        <main className='h-full flex flex-col items-center gap-2 p-2'>
            <h1 onClick={() => open==="classic" ? setOpen("none") : setOpen("classic")}
            className="w-[90vw] md:w-[70vw] xl:w-[40vw] text-center p-1 xl:p-3 text-lg md:text-xl xl:text-2xl font-semibold bg-greenlight">
                Classic
            </h1>
            <div className={`${open === "classic" ? "max-h-[60vh] lg:max-h-[80vh]" : "max-h-0"}
            transition-[max-height 0.15s ease-out] duration-500 overflow-scroll lg:overflow-hidden w-[90vw] md:w-[70vw] xl:w-[40vw] flex flex-col items-center gap-1 md:gap-2 xl:gap-4`}>
                <h3 className="text-center font-semibold">The objective of the game is to guess an unknown 5-letter word.</h3>
                <ul className="flex flex-col items-center text-center mx-3 pb-2">
                    <li>• Each guess must be a five-letter word</li>
                    <li>• You have 6 guesses in total</li>
                    <li>• After each guess, the colour of the tiles change</li>
                </ul>
                <ul className="flex flex-col gap-2 lg:gap-6 mx-3 pb-2">
                    <li>
                    <div className="w-[50vh] grid grid-cols-5 gap-1">
                        {greenExample.map((val, index) => (
                        <LetterBox
                        key = {index}
                        letter = {val.letter}
                        value = {val.value}
                        />
                    ))}
                    </div>
                    <p>A is in the word and in the correct spot.</p>
                    </li>
                    <li>
                    <div className="w-[50vh] grid grid-cols-5 gap-1">
                        {yellowExample.map((val, index) => (
                        <LetterBox
                        key = {index}
                        letter = {val.letter}
                        value = {val.value}
                        />
                    ))}
                    </div>
                    <p>R is in the word, but not in the correct spot.</p>
                    </li>
                    <li>
                    <div className="w-[50vh] grid grid-cols-5 gap-1">
                        {dgreyExample.map((val, index) => (
                        <LetterBox
                        key = {index}
                        letter = {val.letter}
                        value = {val.value}
                        />
                    ))}
                    </div>
                    <p>L is not in the word.</p>
                    </li>
                </ul>
            </div>

            <h1 onClick={() => open==="timed" ? setOpen("none") : setOpen("timed")}
            className="w-[90vw] md:w-[70vw] xl:w-[40vw] text-center p-1 xl:p-3 text-lg md:text-xl xl:text-2xl font-semibold bg-yellow-400">
                Timed
            </h1>
            <div className={`${open === "timed" ? "max-h-[60vh]" : "max-h-0"}
            transition-[max-height 0.15s ease-out] duration-500 overflow-scroll lg:overflow-hidden w-[90vw] md:w-[70vw] xl:w-[40vw] flex flex-col gap-1 md:gap-2 xl:gap-4`}>
                <h3 className="text-center font-semibold">The goal of this gamemode is to score points by guessing as many words as possible in 2 minutes</h3>
                <ul className="flex flex-col items-center text-center mx-3">
                    <li>• You get 6 points if you guess it correctly on the first try, 5 on the second, and so on.</li>
                    <li>• After you guess the word correctly or fail all 6 attempts, you automatically receive a new word to guess.</li>
                </ul>
            </div>
        </main>
    </div>
    )
}