// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from "firebase/auth"
import { getStorage } from "firebase/storage";
import {getDatabase,ref} from "firebase/database"
// import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyA1WgBI3m2uR2mEL3U5S28Beicv3VllzqU",
  authDomain: "chatter-914ed.firebaseapp.com",
  databaseURL: "https://chatter-914ed-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chatter-914ed",
  storageBucket: "chatter-914ed.appspot.com",
  messagingSenderId: "998914676094",
  appId: "1:998914676094:web:f93527792932ccd8f58f2f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getDatabase();
export const Dbref = ref(db,'/Chats')
export const UsersRef = ref(db,'/Users')
export const GAuth = new GoogleAuthProvider()
// export const Navigate = useNavigate()
