// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDX5yfwL8skSAUKlzE_s30jMv0y6GO6THc",
  authDomain: "cinemate-gpt-7be0b.firebaseapp.com",
  projectId: "cinemate-gpt-7be0b",
  storageBucket: "cinemate-gpt-7be0b.firebasestorage.app",
  messagingSenderId: "373610751774",
  appId: "1:373610751774:web:fa362448e6e6d280368b0f",
  measurementId: "G-LLCM8JLH9K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Globally used everywhere

export { auth };
