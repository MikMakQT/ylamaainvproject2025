import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// You can find this information in your Firebase project settings
const firebaseConfig = {

    apiKey: "AIzaSyC7S7bAljF-4zTv2rLzkMqTxSINEf50Ex8",

    authDomain: "ylamaaproject2025.firebaseapp.com",

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

export { app, db };
