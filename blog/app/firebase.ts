"use client";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Messaging, getToken } from "firebase/messaging";
import { getMessaging } from "firebase/messaging";

// Keep in sync with blog/public/firebase-messaging-sw.js
/* cSpell:disable */
const firebaseConfig = {
  apiKey: "AIzaSyDb3EMcaup586c9eDfAbhqnaiDNnj2VMFE",
  authDomain: "coasting-along.firebaseapp.com",
  projectId: "coasting-along",
  storageBucket: "coasting-along.appspot.com",
  messagingSenderId: "186959953999",
  appId: "1:186959953999:web:05c44fab5fb77c0fa26a3a",
};
/* cSpell:enable */

const logging = "[firebase/messaging]";

let app: FirebaseApp | undefined = undefined;
let messaging: Messaging | undefined = undefined;

const isInitialized = initialize();

export async function initialize(): Promise<boolean> {
  if (typeof window === "undefined") {
    console.warn(logging, "not running in browser");
    return false;
  }

  try {
    app = initializeApp(firebaseConfig);
    messaging = getMessaging(app);
    await registerServiceWorker();
  } catch (error) {
    console.error(logging, "error registering service worker", error);
    return false;
  }
  return true;
}

async function registerServiceWorker() {
  console.log(logging, "registering service worker");
  if (!window.navigator || !("serviceWorker" in window.navigator)) {
    console.warn(logging, "service worker not supported");
    return;
  }

  const response = await window.navigator.serviceWorker.register(
    "./firebase-messaging-sw.js",
  );

  console.log(logging, "response", response);
}

export async function requestMessagingPermission(): Promise<boolean> {
  if (!(await isInitialized)) {
    return false;
  }

  console.info(logging, "requesting notification permission");
  if (!("Notification" in window) || !Notification || !messaging) {
    console.warn(
      logging,
      "notification api not supported",
      !("Notification" in window),
      !Notification,
      !messaging,
    );
    return false;
  }

  let permission: NotificationPermission | undefined;
  try {
    permission = await Notification.requestPermission();
  } catch (error) {
    return false;
  }

  switch (permission) {
    case "default":
      console.warn(logging, "notification permission is not yet set and hence is denied");
      return false;

    case "denied":
      console.warn(logging, "notification permission denied");
      return false;

    case "granted":
      console.info(logging, "notification permission granted");
      /* cSpell:disable */
      const token = await getToken(messaging, {
        vapidKey:
          "BPIAV7RZrW0zofnXKk88EmYsgCli3UMkJ7q3LpV6Pgl0COLvSZjpfdjJIZxY42nR0UtvFWrkmTbpC7-G42_Tfu0",
      });
      /* cSpell:enable */
      console.info(logging, token);

      return true;
  }
}
