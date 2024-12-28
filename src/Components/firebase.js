import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHtCwMDHMA3LfA9h9CFFg9TDffEisAJSg",
  authDomain: "chatapp-d9b4f.firebaseapp.com",
  projectId: "chatapp-d9b4f",
  storageBucket: "chatapp-d9b4f.firebasestorage.app",
  messagingSenderId: "843944034522",
  appId: "1:843944034522:web:923c3458b5e04d869da5e3",
  measurementId: "G-7DZWB1QTHL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export default app;
