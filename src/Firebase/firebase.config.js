
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAHkyObo1hSq3nhnBvE-BNoGtdEvGe6oFQ",
    authDomain: "tastyride-cd1a3.firebaseapp.com",
    projectId: "tastyride-cd1a3",
    storageBucket: "tastyride-cd1a3.firebasestorage.app",
    messagingSenderId: "493869865320",
    appId: "1:493869865320:web:a1d05d735abe4a7168dedd"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)