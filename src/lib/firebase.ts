import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA55t28nfDje88mbnZC3S5hQ8l7OrNTl1k",
  authDomain: "livraizon-82d80.firebaseapp.com",
  projectId: "livraizon-82d80",
  storageBucket: "livraizon-82d80.firebasestorage.app",
  messagingSenderId: "97712279023",
  appId: "1:97712279023:web:fa0bc8b29f5dc68978ba1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);