
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBe3u9Be0e7BllVRb1whjesKv7A-Y82XNc",
  authDomain: "piano-shop.firebaseapp.com",
  databaseURL: "https://piano-shop-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "piano-shop",
  storageBucket: "piano-shop.appspot.com",
  messagingSenderId: "888194168836",
  appId: "1:888194168836:web:687397b9598f3860cf9d51"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
export { auth };