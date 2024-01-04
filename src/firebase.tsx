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

export async function addClassicWin(email:string){

  return new Promise( (resolve, reject) => {
    updateDoc(doc(db, "users", email), {
      classicGames: increment(1),
      classicWins: increment(1),
      classicAvg: 0,
    })
      .then(() => {
        resolve(`Added new classic win for ${email}`);
      })
      .catch((err) => {
        reject(err);
      })
    })
}

// Initialize Firebase Authentication and get a reference to the service

export const auth = getAuth(app);


export default app;