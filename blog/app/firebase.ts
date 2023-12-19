// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDb3EMcaup586c9eDfAbhqnaiDNnj2VMFE",
  authDomain: "coasting-along.firebaseapp.com",
  projectId: "coasting-along",
  storageBucket: "coasting-along.appspot.com",
  messagingSenderId: "186959953999",
  appId: "1:186959953999:web:05c44fab5fb77c0fa26a3a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
