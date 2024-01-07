import { useState } from "react";

import { NavBar } from "../components/NavBar";
import Header from "../components/Header";
import LetterBox from "../components/LetterBox";

import { cellValueInterface } from "../logic/baseWordle";

export default function HowToPlay(){
    // can be "none", "classic", "timed", or "blanks"
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

    const blanksExample:cellValueInterface[] = [
        {letter:"", value:3},
        {letter:"", value:3},
        {letter:"A", value:2},
        {letter:"", value:3},
        {letter:"", value:3},
    ]

    const blanksExample2:cellValueInterface[] = [
        {letter:"", value:3},
        {letter:"", value:3},
        {letter:"A", value:2},
        {letter:"", value:3},
        {letter:"K", value:2},
    ]

    return (

    <div className='h-screen flex flex-col justify-between gap-1'>
        <NavBar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />

        <Header />

        <main className='h-full flex flex-col items-center gap-2 p-2'>

            {/* CLASSIC */}
            <h1 onClick={() => open==="classic" ? setOpen("none") : setOpen("classic")}
            className="w-[90vw] md:w-[70vw] xl:w-[40vw] text-center p-1 xl:p-3 text-lg md:text-xl xl:text-2xl font-semibold bg-greenlight">
                Classic
            </h1>

            <div className={`${open === "classic" ? "max-h-[60vh] lg:max-h-[80vh]" : "max-h-0"}
            transition-[max-height 0.15s ease-out] duration-500 overflow-scroll lg:overflow-hidden w-[90vw] md:w-[70vw] xl:w-[40vw] flex flex-col items-center gap-1 md:gap-2 xl:gap-4`}>
                <h3 className="text-center font-semibold">The objective of the game is to guess an unknown 5-letter word.</h3>
                <ul className="flex flex-col items-center text-center mx-3 pb-2">
                    <li>• Each guess does not have to be a valid word, but must be five letters long</li>
                    <li>• You have 6 guesses in total</li>
                    <li>• After each guess, the colour of the tiles change as feedback</li>
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

            {/* TIMED */}
            <h1 onClick={() => open==="timed" ? setOpen("none") : setOpen("timed")}
            className="w-[90vw] md:w-[70vw] xl:w-[40vw] text-center p-1 xl:p-3 text-lg md:text-xl xl:text-2xl font-semibold bg-yellow-400">
                Timed
            </h1>

            <div className={`${open === "timed" ? "max-h-[60vh]" : "max-h-0"}
            transition-[max-height 0.15s ease-out] duration-500 overflow-scroll lg:overflow-hidden w-[90vw] md:w-[70vw] xl:w-[40vw] flex flex-col gap-1 md:gap-2 xl:gap-4`}>
                <h3 className="text-center font-semibold">The goal of this gamemode is to guess as many words as possible in 3 minutes.</h3>
                <ul className="flex flex-col items-center text-center mx-3">
                    <li>• You get 10 points if you guess it correctly on the first try, 9 on the second, and so on</li>
                    <li>• After you guess the word correctly or fail all 6 attempts, you automatically receive a new word to guess</li>
                </ul>
            </div>

            {/* BLANKS */}
            <h1 onClick={() => open==="blanks" ? setOpen("none") : setOpen("blanks")}
            className="w-[90vw] md:w-[70vw] xl:w-[40vw] text-center p-1 xl:p-3 text-lg md:text-xl xl:text-2xl font-semibold bg-red-400">
                Blanks
            </h1>

            <div className={`${open === "blanks" ? "max-h-[60vh]" : "max-h-0"}
            transition-[max-height 0.15s ease-out] duration-500 overflow-scroll lg:overflow-hidden w-[90vw] md:w-[70vw] xl:w-[40vw] flex flex-col gap-1 md:gap-2 xl:gap-4`}>
                <h3 className="text-center font-semibold">In this gamemode, the letters of the word will be revealed as you make guess attempts.</h3>
                <ul className="flex flex-col items-center text-center mx-3">
                    <li>• You have 4 attempts to guess the unknown 5-letter word</li>
                    <li>• You get 1 point for each word you guess correctly</li>
                    <li>• If you guess incorrectly, another letter and its position in the word is revealed to you, up to 4 total</li>
                    <li>• Unlike the other gamemodes, no additional feedback is given on your guess attempt</li>
                    <li>• After you guess the word correctly or fail all 4 attempts, you automatically receive a new word to guess</li>
                </ul>
                
                <ul className="flex flex-col gap-2 lg:gap-6 mx-3 pb-2">
                    <li>
                    <div className="w-[50vh] grid grid-cols-5 gap-1">
                        {blanksExample.map((val, index) => (
                        <LetterBox
                        key = {index}
                        letter = {val.letter}
                        value = {val.value}
                        />
                    ))}
                    </div>
                    <p>When the game starts, you only know 1 random letter in the word.</p>
                    </li>

                    <li>
                    <div className="w-[50vh] grid grid-cols-5 gap-1">
                        {blanksExample2.map((val, index) => (
                        <LetterBox
                        key = {index}
                        letter = {val.letter}
                        value = {val.value}
                        />
                    ))}
                    </div>
                    <p>After an incorrect guess, another letter is randomly revealed.</p>
                    </li>
                </ul>
            </div>
        </main>
    </div>
    )
}