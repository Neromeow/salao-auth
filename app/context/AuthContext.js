"use client";
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const githubSignIn = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider);
  };

  const signUpWithEmail = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithEmail = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const resetPassword = async (email) => {
    return await sendPasswordResetEmail(auth, email);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        googleSignIn,
        githubSignIn,
        signUpWithEmail,
        signInWithEmail,
        resetPassword,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
