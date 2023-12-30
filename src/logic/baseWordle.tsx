import { concatStringArr } from "./stringFunctions";

export interface wordCheckResponseInterface {
    message: string,
    value: number,
    found: boolean,
    optionsArray: number[],
    win: boolean,
    answer: string
  }
  
export interface cellValueInterface {
    letter: string,
    value: number,
  }

// VALUES:
// 0 - white, never been guessed
// 1 - yellow, in word but correct spot not found
// 2- green, in word & correct spot found
// 3 - black, guessed but not in word

// default state of the grids
export const wordsArr:cellValueInterface[][] = [
        [{ letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }],
        [{ letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }],
        [{ letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }],
        [{ letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }],
        [{ letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }],
        [{ letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }],
  ];

// default state of the keyboard
export const keyboardArr = new Map<string, number>();
["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", 
"q", "r", "s", "t", "u", "v", "w", "x", "y", "z"].forEach(letter => (
  keyboardArr.set(letter, 0)
));

// on valid letter input
export function gridLetter(
  letter : string,
  arrayIndex : number,
  letterIndex : number, setLetterIndex : (letter:number) => void, 
  words : cellValueInterface[][],
  setWords : (words:cellValueInterface[][]) => void
) : void {

  let prevWords = [...words]
  prevWords[arrayIndex][letterIndex].letter = letter;
  setWords(prevWords);

  let prevIndex = letterIndex;
  prevIndex += 1;
  setLetterIndex(prevIndex)
}

// on valid backspace
export function gridBackspace(
  arrayIndex : number, 
  letterIndex : number, setLetterIndex : (letter:number) => void, 
  words : cellValueInterface[][], setWords : (words:cellValueInterface[][]) => void
) : void {

  let prevLetterIndex = letterIndex - 1;

  if (prevLetterIndex >= 0 && arrayIndex < 6) {
    let wordsCopy = [...words];
    let wordLineCopy = wordsCopy[arrayIndex];

    wordLineCopy[prevLetterIndex]['letter'] = ''
    wordsCopy[arrayIndex] = wordLineCopy;

    setWords(wordsCopy);

    setLetterIndex(prevLetterIndex);
  }
}

// on valid guess enter
export function gridEnter(
  answer : string, 
  arrayIndex : number, setArrayIndex : (i:number) => void, 
  letterIndex : number, setLetterIndex : (i:number) => void, 
  words : cellValueInterface[][], 
  setWords : (words:cellValueInterface[][]) => void, 
  keyboardVals : Map<string, number>, 
  setKeyboardVals : (k:Map<string, number>) => void){

  let guess = concatStringArr(words[arrayIndex]);

  let wordsCopy = structuredClone(words);
  let kValsCopy = new Map(keyboardVals);

  let guessColors = getGuessColors(guess, answer);

  for (let i = 0; i<5; i++){
    wordsCopy[arrayIndex][i].value = guessColors[i];
        
    const curLetter = wordsCopy[arrayIndex][i].letter;

    // if the letter val is already 2 (confirmed), colour shouldn't change
    //  otherwise, change its corresponding key in the keyboard to match cur value
    if (kValsCopy.get(curLetter)! !== 2){
      kValsCopy.set(curLetter, guessColors[i]);
    }
  }

  let arrayIndexCopy:number = arrayIndex;
  arrayIndexCopy += 1;
  setArrayIndex(arrayIndexCopy);
  setLetterIndex(0);

  setWords(wordsCopy);
  setKeyboardVals(kValsCopy);

  // win
  if (guess === answer) {
    setArrayIndex(6);
    return "victory";
  }
  // lost
  if (arrayIndexCopy >= 6){
    return "lost";
  }
  return "running";
}

// take guess & answer & determine grid colour values
function getGuessColors (guess:string, answer:string) : number[] {
  let letterCount : Map<string, number> = new Map();
  let ret : number[] = [3, 3, 3, 3, 3];

  for (let letter of answer){
    letterCount.set(letter, (letterCount.get(letter) ?? 0) + 1);
  }

  // check for green - exists & in correct spot
  for (let i = 0; i<5; i++){
    if (guess[i] === answer[i]){
      ret[i] = 2;
      letterCount.set(guess[i], (letterCount.get(guess[i]) ?? 0) - 1)
    }
  }

  // check for yellow - exists but in incorrect spot
  for (let i = 0; i<5; i++){
    if ( ret[i] > 1 && (letterCount.get(guess[i]) ?? -1) > 0){
      ret[i] = 1;
    }
  }

  return ret;
}