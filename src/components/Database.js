
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
      onAuthStateChanged,
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      getAuth,
} from "firebase/auth";


const firebaseConfig = {
      apiKey: "AIzaSyDqZ4KezaoQFeqq-yKLKU8x0zmMe0dBEy0",
      authDomain: "management-system-ef1c9.firebaseapp.com",
      databaseURL: "https://management-system-ef1c9-default-rtdb.firebaseio.com",
      projectId: "management-system-ef1c9",
      storageBucket: "management-system-ef1c9.appspot.com",
      messagingSenderId: "180990896672",
      appId: "1:180990896672:web:6fc38d2453437ea59dea45",
      measurementId: "G-6BCMWNT7PV"
    };

// Initialize Firebase
const auth = getAuth(firebaseConfig);
const db = getFirestore(firebaseConfig);

export {auth,
       db,
       onAuthStateChanged,
       createUserWithEmailAndPassword,
       signInWithEmailAndPassword,
      }
