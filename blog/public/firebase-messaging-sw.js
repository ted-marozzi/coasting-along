importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

// Keep in sync with blog/app/firebase.ts
firebase.initializeApp({
  apiKey: "AIzaSyDb3EMcaup586c9eDfAbhqnaiDNnj2VMFE",
  authDomain: "coasting-along.firebaseapp.com",
  projectId: "coasting-along",
  storageBucket: "coasting-along.appspot.com",
  messagingSenderId: "186959953999",
  appId: "1:186959953999:web:05c44fab5fb77c0fa26a3a",
});

const messaging = firebase.messaging();
