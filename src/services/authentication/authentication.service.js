import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {initializeApp, getApps} from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD1JzqbP4fBpfFh27zn3vP31KEcA9YHFr0",
  authDomain: "mealstogo-5cbea.firebaseapp.com",
  projectId: "mealstogo-5cbea",
  storageBucket: "mealstogo-5cbea.appspot.com",
  messagingSenderId: "878561430247",
  appId: "1:878561430247:web:85c659e2a74767bc7fb042",
};

if (getApps().length < 1) {
  initializeApp(firebaseConfig);
  // Initialize other firebase products here
}
export const auth = getAuth();
export const loginRequest = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const registerRequest = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const logoutRequest = () => signOut(auth);
