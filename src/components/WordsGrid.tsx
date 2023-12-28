import { cellValueInterface } from "../logic/baseWordle";
import LetterBox from "./LetterBox";

interface WGridProps {
    grid : any;
    words : cellValueInterface[][];
    animate : {i:number, type:string|null};
    smaller? : boolean;
}

export default function WordsGrid({grid, words, animate, smaller}:WGridProps){
    return (
        <div ref={grid} className={`w-[50vh] ${smaller && 'w-[45vh] md:w-[50vh]'} grid grid-rows-6 gap-1 sm:p-1 md:p-2 `}>
        {words.map((word, index) => (
          <div key={index} className={`grid grid-cols-5 gap-1 
          ${(index === animate.i && animate.type === "shake")  && 'animate-shake-sm md:animate-shake-md'}
          ${(index === animate.i && animate.type === "blink") && 'animate-blink'}`}>
            {word.map((val, index) => (
              <LetterBox
                key = {index}
                letter = {val.letter}
                value = {val.value}
              />
            ))}
          </div>
        ))}
      </div>
    )
}