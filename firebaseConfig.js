// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBekBFerrdGUx5w-Ubdk91JW0We-buACU0",
    authDomain: "ecom-platform-72d4b.firebaseapp.com",
    projectId: "ecom-platform-72d4b",
    storageBucket: "ecom-platform-72d4b.appspot.com",
    messagingSenderId: "569454822959",
    appId: "1:569454822959:web:5b67c60284d85082ada8da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
