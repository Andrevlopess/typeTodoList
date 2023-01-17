import { getFirestore, collection, getDocs, addDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {getStorage} from 'firebase/storage'

const firebaseConfig = initializeApp({
    apiKey: "AIzaSyBnv5fqI6pyNyjo37cuH9Kxkoot8RsTNjY",
    authDomain: "todoauth-89970.firebaseapp.com",
    projectId: "todoauth-89970",
    storageBucket: "todoauth-89970.appspot.com",
    messagingSenderId: "1009726068645",
    appId: "1:1009726068645:web:505544ae242c5b322d7a4c"
});

// Initialize Firebase
export const auth = getAuth(firebaseConfig)

export const db = getFirestore(firebaseConfig)

export const TasksCollectionRef = collection(db, "Tasks");

export const storage = getStorage(firebaseConfig);




