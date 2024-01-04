// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc, DocumentData, increment } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service

const db = getFirestore(app);

// Creating user data in collection

export async function createUserData(email:string, displayName:string, password:string){
  return new Promise( (resolve, reject) => {
    setDoc(doc(db, "users", email), {
      email,
      displayName,
      password,
      classicGames: 0,
      classicWins: 0,
      classicAvg: 0,
      timedGames: 0,
      timedHigh: 0,
      timedAvg: 0,
    })
      .then(() => {
        resolve(`${email} added to collection!`);
      })
      .catch((err) => {
        reject(err);
      })
    })
}

// Reading user data

export async function getUser(email:string) : Promise<DocumentData> {
  return new Promise( (resolve, reject) => {
    getDoc(doc(db, "users", email))
      .then((user) => {
        resolve(user.data()!);
      })
      .catch((err) => {
        reject(err);
      });
  })
}

// Updating user data

function getClassicAvg(email:string, guesses:number) : Promise<number> {
  return new Promise( (resolve, reject) => {
    let avgGuess = 0;

    getUser(email)
      .then((data) => {
        avgGuess = (data.classicAvg*data.classicGames + guesses) / (data.classicGames + 1);
        resolve(avgGuess);
      }).catch((err) => {
        reject(err);
    })
  })

}

export async function addClassicWin(email:string, guesses:number){
  getClassicAvg(email, guesses)
    .then((avgGuess) => {
      updateDoc(doc(db, "users", email), {
        classicGames: increment(1),
        classicWins: increment(1),
        classicAvg: avgGuess,
      })
      .catch((err) => {
        console.log(err);
      })
    })
    .catch((err) => {
      console.log(err);
    })
}

export async function addClassicLoss(email:string){
  getClassicAvg(email, 6)
  .then((avgGuess) => {
    updateDoc(doc(db, "users", email), {
      classicGames: increment(1),
      classicAvg: avgGuess,
    })
    .catch((err) => {
      console.log(err);
    })
  })
  .catch((err) => {
    console.log(err);
  })
}

function getTimedScores(email:string, newScore:number) : Promise<number[]> {
  return new Promise( (resolve, reject) => {
    let avgScore:number = 0;
    let highScore:number = 0;

    getUser(email)
      .then((data) => {
        avgScore = (data.timedAvg*data.timedGames + newScore) / (data.timedGames + 1);
        highScore = data.timedHigh>newScore ? data.timedHigh : newScore;
        resolve([avgScore, highScore]);
      }).catch((err) => {
        reject(err);
    })
  })
}

export async function addTimedGame(email:string, score:number){
  getTimedScores(email, score)
  .then(([avgScore, highScore]) => {
    updateDoc(doc(db, "users", email), {
      timedGames: increment(1),
      timedHigh: highScore,
      timedAvg: avgScore,
    })
    .catch((err) => {
      console.log(err);
    })
  })
  .catch((err) => {
    console.log(err);
  })
}

// Initialize Firebase Authentication and get a reference to the service

export const auth = getAuth(app);


export default app;