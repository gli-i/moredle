import { useState, useEffect } from 'react';

import { cellValueInterface, wordsArrBlanks, keyboardArr, gridLetter, gridBackspace } from '../logic/baseWordle';
import { isLetter, concatStringArr } from '../logic/stringFunctions';
import { getWord } from '../logic/wordBank';

import Header from '../components/Header'
import LetterBox from '../components/LetterBox';
import Keyboard from '../components/Keyboard';
import Timer from '../components/Timer';
import ScoreDisplay from '../components/ScoreDisplay';
import GameOver from '../components/GameOver';
import { NavBar } from '../components/NavBar';

/* import { onAuthStateChanged } from "firebase/auth";
import { auth, getUser, addTimedGame } from '../firebase'; */

export default function Blanks() {
  const [curUser, setCurUser] = useState<string>('');

  const [answer, setAnswer] = useState<string>('');

  const [words, setWords] = useState<cellValueInterface[][]>(structuredClone(wordsArrBlanks));
  const [hint, setHint] = useState<cellValueInterface[]>(
    [{ letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }],
  )

  const [keyboardVals, setKeyboardVals] = useState<Map<string, number>>(keyboardArr);

  const [letter, setLetter] = useState<string>('');
  const [arrayIndex, setArrayIndex] = useState<number>(0);
  const [letterIndex, setLetterIndex] = useState<number>(0);

  // states are "ready". "running", & "over"
  const [gameStatus, setGameStatus] = useState<string>("ready");

  const [secs, setSecs] = useState<number>(0);

  const [score, setScore] = useState<number>(0);
  const [topScore, setTopScore] = useState<number>(0);

  const [animate, setAnimate] = useState<{ i: number, type: string | null }>({ i: 0, type: null });


  function onKeyDown(event: KeyboardEvent) {
    setLetter(event.key);
  }
  // when clicking the onscreen keyboard
  function keyClick(letter: string) {
    letter === "Del" ? setLetter("Backspace") : setLetter(letter);
  }

  function handleLetter() : void {
    if (letter !== '' && letterIndex <= 4 && arrayIndex < 6) {
      gridLetter(letter, arrayIndex, letterIndex, setLetterIndex, words, setWords);
    }
  }

  function handleBackspace() : void {
    if (letterIndex > 0 && arrayIndex < 6){
      gridBackspace(arrayIndex, letterIndex, setLetterIndex, words, setWords);
    }
  }

  function handleEnter() : void {
    if (letterIndex > 4 && arrayIndex < 4){ // valid input
      let guess = concatStringArr(words[arrayIndex]);

      if (guess === answer){ // correct answer
        const newScore = score + 1;
        setScore(newScore);
        if (newScore > topScore){
          setTopScore(newScore);
        }
        resetWord();

      } else if (arrayIndex > 2){ // was at last row & did not win
        for (let letter of words[arrayIndex]){
            letter.value = 3;
        }
        resetWord();

      } else { // game continues
        let wordsCopy = structuredClone(words);
        for (let letter of wordsCopy[arrayIndex]){
            letter.value = 3;
        }
        setWords(wordsCopy);
        addLetterHint(hint, answer);

        let arrayIndexCopy:number = arrayIndex;
        arrayIndexCopy += 1;
        setArrayIndex(arrayIndexCopy);
        setLetterIndex(0);
      }

      setAnimate({i:arrayIndex, type:"blink"});
      setTimeout(() => setAnimate({i:-1, type:null}), 300);

    } else if (gameStatus === "over"){ // game already won or lost
      restartGame();

    } else {      // incorrect input (less than 5 chars)
        setAnimate({i:arrayIndex, type:"shake"});
        setTimeout(() => setAnimate({i:-1, type:null}), 300);
    }
  }

  // restarts the entire game, including current score
  function restartGame() {
    setScore(0);
    setGameStatus("ready");
  }

  // clears the grid & keyboard, & gives a new word
  function resetWord() {
    setWords(structuredClone(wordsArrBlanks));
    setLetter('');
    setArrayIndex(0);
    setLetterIndex(0);
    setKeyboardVals(keyboardArr);

    getWord().then((word) => {
      setAnswer(word);
      resetLetterHint(word);
    })
  }

  // resets the "hint" panel to default, then adds 1 letter hint
  function resetLetterHint(answer:string){
    let hintCopy = structuredClone(hint);
    for (let i in hintCopy){
        hintCopy[i].letter = '';
        hintCopy[i].value = 3;
    }
    addLetterHint(hintCopy, answer);
  }

  // makes a new letter visible in the "hint" panel
  function addLetterHint(hint:cellValueInterface[], answer:string){
    let hintCopy = structuredClone(hint);
    const numBlanks = 4 - concatStringArr(hint).length;
    let newHintSpot = Math.round(Math.random()*numBlanks);

    for (let i = 0; i<5; i++){
        if (!hintCopy[i].letter){
            if (newHintSpot > 0){
                newHintSpot--;
            } else { // found the spot
                hintCopy[i].letter = answer.charAt(i);
                hintCopy[i].value = 2;
                break;
            }
        }
    }
    setHint(hintCopy);
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  useEffect(() => {
    if (gameStatus !== "over") {
      if (isLetter(letter)) {

        // if the game hasn't started yet, start it
        if (gameStatus === "ready") {
          setGameStatus("running");
        }

        handleLetter();

      } else if (letter === 'Backspace') {
        handleBackspace();

      } else if (letter === 'Enter') {
        handleEnter();
      }
    }

    setLetter('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letter])


  // Countdown Timer Logic

  useEffect(() => {
    if (gameStatus === "ready") {
      setSecs(60);
      resetWord();
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus]);

  useEffect(() => {
    if (secs <= 0 && gameStatus === "running") {
      setGameStatus("over");
      //curUser && addTimedGame(curUser, score);
    }
    if (gameStatus === "running") {
      const interval = setInterval(() => {
        setSecs(secs - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secs, gameStatus]);

/*   useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          setCurUser(user.email!);
          getUser(user.email!)
            .then((data) => setTopScore(data.timedHigh))
            .catch((err) => console.log(err));

        } else {
          setCurUser('');
          setTopScore(0);
        }
      });
      
}, []) */

  return (
    <div className='h-screen flex flex-col justify-between'>
      <NavBar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
      <Header />

      <main className='h-full flex flex-col'>
        <div className='flex justify-center items-center gap-4 md:hidden'>
          <Timer
            secs={secs}
            maxMins={1}
          />
          <ScoreDisplay
            score={score}
            topScore={topScore}
          />
        </div>

        <div className='flex-[2] flex justify-center items-center md:p-1 lg:p-2 2xl:p-4'>

          <div className='flex flex-col items-center gap-12'>
            {/* HINT PANEL */}
            <div className={`w-[45vh] md:w-[50vh] sm:p-1 md:p-2 `}>
                <div className={`grid grid-cols-5 gap-3`}>
                  {hint.map((val, index) => (
                    <LetterBox
                      key = {index}
                      letter = {val.letter}
                      value = {val.value}
                    />
                  ))}
                </div>
            </div>
            {/* INPUT GRIDS */}
            <div className={`w-[65vh] md:w-[75vh] grid grid-rows-2 grid-cols-2 gap-10 sm:p-1 md:p-2 `}>
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
          </div>

          <div className="hidden md:flex flex-col items-center md:gap-4 lg:gap-8 2xl:gap-14 relative left-[5vw]">
            <Timer
              secs={secs}
              maxMins={1}
            />
            <ScoreDisplay
              score={score}
              topScore={topScore}
            />
            <button className='p-2 rounded bg-red-400 font-semibold' onClick={()=>{setSecs(0)}}>End Game</button>
          </div>

        </div>

        <div className="flex-1 flex flex-col gap-1 sm:gap-2 p-2 pb-2 md:pb-4 lg:pb-8 2xl:pb-12">
          <Keyboard
            keyboardVals={keyboardVals}
            keyClick={keyClick}
          />
        </div>
        {gameStatus === "over" && <GameOver
          restartGame={restartGame}
          score={score}
          topScore={topScore}
        />}
      </main>
    </div>
  );
}
