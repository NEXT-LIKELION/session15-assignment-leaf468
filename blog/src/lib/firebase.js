// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaDIBTuYa6s2E1PneX824zXuMatKQgZLs",
  authDomain: "session15-2bf55.firebaseapp.com",
  projectId: "session15-2bf55",
  storageBucket: "session15-2bf55.firebasestorage.app",
  messagingSenderId: "246000333121",
  appId: "1:246000333121:web:bba711ddbffdc77636f1c0",
  measurementId: "G-KGDWEQLLKY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);