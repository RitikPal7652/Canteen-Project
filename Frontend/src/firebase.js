import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// TODO: Paste your Firebase config object here!
// It looks exactly like this but with real random letters and numbers:
const firebaseConfig = {
  apiKey: "AIzaSyA0OwqnfDhgUZiE2hq5rhhpi1eVs7vgSZ8",
  authDomain: "freshbite-canteen.firebaseapp.com",
  projectId: "freshbite-canteen",
  storageBucket: "freshbite-canteen.firebasestorage.app",
  messagingSenderId: "36167911522",
  appId: "1:36167911522:web:55b9bd17cd02deb343a93b",
  measurementId: "G-PRXHB1KMXN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, provider);
