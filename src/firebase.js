import { initializeApp } from "firebase/app";
import { getDatabase, ref } from 'firebase/database';
const userId = 'code'

const firebaseConfig = {
  apiKey: "AIzaSyCvTu22TG-6yCTDY44vp41uyPRra2ZLHfo",
  authDomain: "movie-app-6a444.firebaseapp.com",
  databaseURL: "https://movie-app-6a444-default-rtdb.firebaseio.com",
  projectId: "movie-app-6a444",
  storageBucket: "movie-app-6a444.appspot.com",
  messagingSenderId: "595577296405",
  appId: "1:595577296405:web:797457c91762bdf204201c",
  measurementId: "G-0B7M3Q1VVF"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Database
const database = getDatabase(app)
const userData = ref(database, `users/${userId}`)
const userRef = ref(database, `users/${userId}/moviesId`)
export {database, userData, userId, userRef}