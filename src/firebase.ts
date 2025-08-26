import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Firebase project configuration
const firebaseConfig = {

    apiKey: "AIzaSyC7S7bAljF-4zTv2rLzkMqTxSINEf50Ex8",

    authDomain: "ylamaaproject2025.firebaseapp.com",

    databaseURL: "https://ylamaaproject2025-default-rtdb.europe-west1.firebasedatabase.app",

    projectId: "ylamaaproject2025",

    storageBucket: "ylamaaproject2025.firebasestorage.app",

    messagingSenderId: "545854250148",

    appId: "1:545854250148:web:030625829141758b9f9a31",

    measurementId: "G-8DPYYXLCE4"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore database
const db = getFirestore(app);

// Initialize Realtime Database
const rdb = getDatabase(app);

export { app, db, rdb };
