// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAHVWp7HZ8USJ2ZfP4RggU5_3vP1BeuMro",
  authDomain: "csmticket-54a0a.firebaseapp.com",
  projectId: "csmticket-54a0a",
  storageBucket: "csmticket-54a0a.appspot.com",
  messagingSenderId: "825560795664",
  appId: "1:825560795664:web:c7588661f0293146ead895",
  measurementId: "G-65K52LFKD0"
};

// Initialize Firebase
 firebase.initializeApp(firebaseConfig);

 export const firestore = firebase.firestore();

 export default firebase;