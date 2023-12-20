"use client";

import { initializeApp } from "firebase/app";
import { getToken } from "firebase/messaging";
import { getMessaging } from "firebase/messaging";

// Keep in sync with blog/public/firebase-messaging-sw.js
const firebaseConfig = {
  apiKey: "AIzaSyDb3EMcaup586c9eDfAbhqnaiDNnj2VMFE",
  authDomain: "coasting-along.firebaseapp.com",
  projectId: "coasting-along",
  storageBucket: "coasting-along.appspot.com",
  messagingSenderId: "186959953999",
  appId: "1:186959953999:web:05c44fab5fb77c0fa26a3a",
};

const logging = "[firebase/messaging]";
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
initialize();

export async function initialize() {
  if (typeof window === "undefined") {
    console.warn(logging, "not running in browser");
    return;
  }
  await registerServiceWorker();
}

async function registerServiceWorker() {
  console.log(logging, "registering service worker");

  if (!navigator || !("serviceWorker" in navigator)) {
    console.warn(logging, "service worker not supported");
    return;
  }

  const response = await navigator.serviceWorker.register("./firebase-messaging-sw.js");

  console.log(logging, "response", response);
}

export async function requestMessagingPermission(): Promise<boolean> {
  console.info(logging, "requesting notification permission");
  if (!("Notification" in window) || !Notification) {
    console.warn(logging, "notification api not supported");
    return false;
  }

  const permission = await Notification.requestPermission();

  switch (permission) {
    case "default":
      console.warn(logging, "notification permission is not yet set and hence is denied");
      return false;

    case "denied":
      console.warn(logging, "notification permission denied");
      return false;

    case "granted":
      console.info(logging, "notification permission granted");
      const token = await getToken(messaging, {
        vapidKey:
          "BPIAV7RZrW0zofnXKk88EmYsgCli3UMkJ7q3LpV6Pgl0COLvSZjpfdjJIZxY42nR0UtvFWrkmTbpC7-G42_Tfu0",
      });
      console.info(logging, token);

      return true;
  }
}
