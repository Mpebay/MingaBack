import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"



const firebaseConfig = {
  apiKey: "AIzaSyDVHsWL2cN23SA9o3snYIERSI43ef_Ai0M",
  authDomain: "minga-69542.firebaseapp.com",
  projectId: "minga-69542",
  storageBucket: "minga-69542.appspot.com",
  messagingSenderId: "453662409047",
  appId: "1:453662409047:web:eb19cd62708fec6f383e12",
  measurementId: "G-D9HVH707JF"
};

const app = initializeApp(firebaseConfig);
const firestorage = getStorage(app)

export default firestorage