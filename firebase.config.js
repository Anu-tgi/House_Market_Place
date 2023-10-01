// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZRxJzj3D7BguyTrydaTogXhEpvAB3gUM",
  authDomain: "house-market-2363e.firebaseapp.com",
  projectId: "house-market-2363e",
  storageBucket: "house-market-2363e.appspot.com",
  messagingSenderId: "786968691268",
  appId: "1:786968691268:web:9789c52bec85b9ab83b211"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();