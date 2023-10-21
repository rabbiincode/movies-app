import { initializeApp } from "firebase/app";
import { getDatabase, ref } from 'firebase/database';
const userId = 'user'

const firebaseConfig = {
  apiKey: "AIzaSyD9HaVKmBpIHvcUvzhBDIWXxH1UxpnWUzw",
  authDomain: "moviebox-438f3.firebaseapp.com",
  projectId: "moviebox-438f3",
  storageBucket: "moviebox-438f3.appspot.com",
  messagingSenderId: "241344543899",
  appId: "1:241344543899:web:9392804631887518889a3e",
  measurementId: "G-MSSDZD1G00"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Database
const database = getDatabase(app)
const userRef = ref(database, `users/${userId}`)
//const userRef = ref(database, `users/${userId}/moviesId`)
export {database, userId, userRef}