import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA6E8bMgaYx3Abe-bnErWrre4L9WZg4jy8",
  authDomain: "hackathon-organiser.firebaseapp.com",
  projectId: "hackathon-organiser",
  storageBucket: "hackathon-organiser.appspot.com",
  messagingSenderId: "127047864184",
  appId: "1:127047864184:web:25d36dbd98d114c935c28d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
