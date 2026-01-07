import { initializeApp, type FirebaseApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FCM_API_KEY,
  authDomain: import.meta.env.VITE_FCM_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FCM_PROJECTID,
  storageBucket: import.meta.env.VITE_FCM_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FCM_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FCM_APPID,
  measurementId: import.meta.env.VITE_FCM_MEASUREMENTID,
};

const hasFirebaseConfig =
  Boolean(firebaseConfig.projectId) &&
  Boolean(firebaseConfig.apiKey) &&
  Boolean(firebaseConfig.appId);

let app: FirebaseApp | null = null;

export function getFirebaseApp(): FirebaseApp | null {
  if (!hasFirebaseConfig) {
    console.info("Firebase disabled: missing config");
    return null;
  }
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  return app;
}
