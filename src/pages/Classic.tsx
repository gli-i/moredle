import { useState, useRef, useEffect } from 'react';

import { cellValueInterface, wordsArr, keyboardArr, gridLetter, gridBackspace, gridEnter } from '../logic/baseWordle';
import { isLetter } from '../logic/stringFunctions';
import { getWord } from '../logic/wordBank';

import Header from '../components/Header'
import Keyboard from '../components/Keyboard';
import WordsGrid from '../components/WordsGrid';
import GameOver from '../components/GameOver';
import { NavBar } from '../components/NavBar';

export default function Classic() {
  const grid = useRef(null);

  const [answer, setAnswer] = useState<string>("");

  const [words, setWords] = useState<cellValueInterface[][]>(structuredClone(wordsArr));

  const [keyboardVals, setKeyboardVals] = useState<Map<string, number>>(keyboardArr);

  const [letter, setLetter] = useState<string>('');
  const [arrayIndex, setArrayIndex] = useState<number>(0);
  const [letterIndex, setLetterIndex] = useState<number>(0);

  // states are "ready", "running", "victory", & "lost"
  const [gameStatus, setGameStatus] = useState<string>("ready");

  const [animate, setAnimate] = useState<{i:number,type:string|null}>({i: 0, type: null});

  
  function onKeyDown(event: KeyboardEvent) {
    setLetter(event.key);
  }
  // when clicking the onscreen keyboard
  function keyClick(letter: string) {
    letter === "Del" ? setLetter("Backspace") : setLetter(letter);
  }

  /*

  ['A', 'P', 'P', 'L', 'E'], ArrayIndex = 0 
  ['P', 'E', 'A', 'C', 'H'] ArrayIndex = 1 
              ^
              |
            letterIndex = 2 

  ArrayIndex describes location of current word
  LetterIndex describes location of current letter in current word

  */

  function handleLetter(){
    if (letter !== '' && letterIndex <= 4 && arrayIndex < 6) {
      gridLetter(letter, arrayIndex, letterIndex, setLetterIndex, words, setWords);
    }
  }

  function handleBackspace(){
    if (letterIndex > 0 && arrayIndex < 6){
      gridBackspace(arrayIndex, letterIndex, setLetterIndex, words, setWords);
    }
  }

  function handleEnter(){
    if (letterIndex > 4 && arrayIndex < 6){
      setGameStatus(gridEnter(answer, arrayIndex, setArrayIndex, letterIndex, setLetterIndex, words, setWords, keyboardVals, setKeyboardVals));

      setAnimate({i:arrayIndex, type:"blink"});
      setTimeout(() => setAnimate({i:-1, type:null}), 300);

    } else if (arrayIndex === 6){ // game victory or over
      restartGame();
    } else {      // incorrect input (less than 5 chars)
        setAnimate({i:arrayIndex, type:"shake"});
        setTimeout(() => setAnimate({i:-1, type:null}), 300);
    }
  }

  function restartGame(){
    setWords(structuredClone(wordsArr));
    setLetter('');
    setArrayIndex(0);
    setLetterIndex(0);
    setKeyboardVals(keyboardArr);
    setGameStatus("ready");
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  // on letter change (user input)
  useEffect(() => {
    if (isLetter(letter)){
      handleLetter();
    } else if (letter === 'Backspace') {
        handleBackspace();
    } else if (letter === 'Enter') {
        handleEnter();
    }

    setLetter('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letter])

  // if game is ready, get new answer word & start
  useEffect(() => {
    if (gameStatus === "ready") {
      getWord().then((word) => {
        setAnswer(word);
      })
      setGameStatus("running");
    }
  }, [gameStatus]);

  return (
    <div className='h-screen flex flex-col justify-between gap-1'>
      
      <NavBar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
        
      <Header />

      <main className='h-full flex flex-col'>
        <div className='flex-[2] flex justify-center items-center md:p-1 lg:p-2 2xl:p-4'>
          <WordsGrid
            grid = {grid}
            words = {words}
            animate = {animate}
          />
        </div>
        <div className="flex-1 flex flex-col gap-1 sm:gap-2 p-2 pb-2 md:pb-4 lg:pb-8 2xl:pb-12">
          <Keyboard
            keyboardVals = {keyboardVals}
            keyClick = {keyClick}
          />
        </div>
        {(gameStatus === "victory" || gameStatus === "lost") && <GameOver 
            restartGame = {restartGame}
            gameStatus = {gameStatus}
          />}
      </main>
    </div>
  );
}
