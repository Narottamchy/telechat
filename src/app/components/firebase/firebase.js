require('dotenv').config()
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API}`,
  authDomain: "telechat-f7e06.firebaseapp.com",
  projectId: "telechat-f7e06",
  storageBucket: "telechat-f7e06.appspot.com",
  messagingSenderId: "685487377702",
  appId: "1:685487377702:web:164907d2accf3e78e045e7",
  measurementId: "G-BST1FKLN79"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth,provider};
export const storage = getStorage(app);

