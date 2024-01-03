// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, DocumentData } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyCw5jIog1o8Zai1UYawxaef8GGUG3g_2CY",

  authDomain: "moredle.firebaseapp.com",

  projectId: "moredle",

  storageBucket: "moredle.appspot.com",

  messagingSenderId: "759421325851",

  appId: "1:759421325851:web:7c53ddf20f1da600701ebe",

  measurementId: "G-FKHJMXV1WR"

};


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
      timedHigh: 0,
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


// Initialize Firebase Authentication and get a reference to the service

export const auth = getAuth(app);


export default app;