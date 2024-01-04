import { useState, useEffect } from 'react';

import { cellValueInterface, wordsArr, keyboardArr, gridLetter, gridBackspace, gridEnter } from '../logic/baseWordle';
import { isLetter } from '../logic/stringFunctions';
import { getWord } from '../logic/wordBank';

import Header from '../components/Header'
import Keyboard from '../components/Keyboard';
import WordsGrid from '../components/WordsGrid';
import Timer from '../components/Timer';
import ScoreDisplay from '../components/ScoreDisplay';
import GameOver from '../components/GameOver';
import { NavBar } from '../components/NavBar';

import { onAuthStateChanged } from "firebase/auth";
import { auth, getUser, addTimedGame } from '../firebase';

export default function Timed() {
  const [curUser, setCurUser] = useState<string>('');

  const [answer, setAnswer] = useState<string>('');

  const [words, setWords] = useState<cellValueInterface[][]>(structuredClone(wordsArr));

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
    if (letterIndex > 4 && arrayIndex < 6){
      const guessResult = gridEnter(answer, arrayIndex, setArrayIndex, letterIndex, setLetterIndex, words, setWords, keyboardVals, setKeyboardVals);

      setAnimate({i:arrayIndex, type:"blink"});
      setTimeout(() => setAnimate({i:-1, type:null}), 300);

      if (guessResult){
        const newScore = score + (10 - arrayIndex);
        setScore(newScore);
        if (newScore > topScore){
          setTopScore(newScore);
        }

        resetWord();
      } else if (arrayIndex > 4){ // was at last row & did not win
        resetWord();
      }

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
    setWords(structuredClone(wordsArr));
    setLetter('');
    setArrayIndex(0);
    setLetterIndex(0);
    setKeyboardVals(keyboardArr);

    getWord().then((word) => {
      setAnswer(word);
    })
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
      setSecs(180);
      resetWord();
    }
  }, [gameStatus]);

  useEffect(() => {
    if (secs <= 0 && gameStatus === "running") {
      setGameStatus("over");
      curUser && addTimedGame(curUser, score);
    }
    if (gameStatus === "running") {
      const interval = setInterval(() => {
        setSecs(secs - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secs, gameStatus]);

  useEffect(()=>{
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
      
}, [])

  return (
    <div className='h-screen flex flex-col justify-between'>
      <NavBar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
      <Header />

      <main className='h-full flex flex-col'>
        <div className='flex justify-center items-center gap-4 md:hidden'>
          <Timer
            secs={secs}
          />
          <ScoreDisplay
            score={score}
            topScore={topScore}
          />
        </div>
        <div className='flex-[2] flex justify-center items-center md:p-1 lg:p-2 2xl:p-4'>
          <div className='flex-1 hidden md:inline'></div>
          <div className=''>
            <WordsGrid
              words={words}
              animate={animate}
              smaller={true}
            />
          </div>
          <div className="flex-1 hidden md:flex flex-col items-center md:gap-4 lg:gap-8 2xl:gap-14 relative right-[5vw]">
            <Timer
              secs={secs}
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
