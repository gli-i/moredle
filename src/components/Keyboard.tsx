//import { keyboard } from "@testing-library/user-event/dist/keyboard";

interface KeyboardProps {
    keyboardVals: Map<string, number>;
    keyClick: (letter: string) => void;
  }

export default function Keyboard({keyboardVals, keyClick} : KeyboardProps){
    const keys:string[][] = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Del']];

    return (
    <>
        {keys.map((row) => (
            <div key={row[1]} className="w-full h-full flex justify-center gap-1 sm:gap-2">
                {row.map((letter) => (
                    <button type="button" key={letter} className={`sm:py-2 flex-1
                        rounded border-1 text-center uppercase font-semibold sm:text-xl md:text-2xl lg:text-3xl 
                        ${(!keyboardVals.get(letter) || keyboardVals.get(letter)===0) && 'bg-graylight hover:bg-gray-400 active:bg-gray-500' }
                        ${keyboardVals.get(letter)===1 && 'bg-yellow-400 hover:bg-yellowmed active:bg-orange-500'}
                        ${keyboardVals.get(letter)===2 && 'bg-greenlight hover:bg-greenmed active:bg-greendark'}
                        ${keyboardVals.get(letter)===3 && 'bg-graydark hover:bg-graydarker active:bg-graydarkest'}
                        ${keyboardVals.get(letter) && keyboardVals.get(letter)!==0 && 'text-white'}
                        ${letter.length === 1 && 'max-w-[70px]'}
                        ${letter === "Del" && 'text-[0.8rem] max-w-[100px]'}
                        ${letter === "Enter" && 'text-[0.8rem] max-w-[120px]'}
                        `} onClick={() => keyClick(letter)}>
                        {letter}
                    </button>
                ))}
            </div>
        ))}
    </>
    )
}