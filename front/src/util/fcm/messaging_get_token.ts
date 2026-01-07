import { getMessaging, getToken, isSupported } from "firebase/messaging";
import { getFirebaseApp } from "./firebase";

async function GetToken() {
  const app = getFirebaseApp();
  if (!app) return;

  const supported = await isSupported().catch(() => false);
  if (!supported) {
    console.info("FCM not supported in this browser. Skip GetToken()");
    return;
  }

  const vapidKey = import.meta.env.VITE_VAPID_KEY;
  if (!vapidKey) {
    console.info("FCM disabled: missing VAPID key");
    return;
  }

  try {
    const firebaseMessaging = getMessaging(app);
    const currentToken = await getToken(firebaseMessaging, { vapidKey });

    if (currentToken) {
      localStorage.setItem("fcm_token", currentToken);
    } else {
      console.log("No registration token available.");
    }
  } catch (err) {
    console.log("An error occurred while retrieving token.", err);
  }
}

export default GetToken;
