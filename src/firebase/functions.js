import firebase from "firebase/app"; // should not import 2nd time -- fix it
import { auth /*, GoogleAuthProvider */ } from "./init";

export const getServerTimestamp = () => {
  return firebase.firestore.FieldValue.serverTimestamp();
};

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    auth.signInWithPopup(provider);
    // eslint-disable-next-line no-empty
  } catch {}
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
