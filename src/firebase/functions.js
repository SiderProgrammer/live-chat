import firebase from "firebase/app";
import { auth, GoogleAuthProvider } from "./init";

export const getServerTimestamp = () => {
  return firebase.firestore.FieldValue.serverTimestamp();
};

export const signInWithGoogle = () => {
  auth.signInWithPopup(GoogleAuthProvider);
};

export const signOut = () => {
  auth.signOut();
};

export const createUserWithEmailAndPassword = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const signInWithEmailAndPassword = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};
