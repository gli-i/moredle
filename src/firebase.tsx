// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

// Initialize Firebase Authentication and get a reference to the service

export const auth = getAuth(app);
export default app;