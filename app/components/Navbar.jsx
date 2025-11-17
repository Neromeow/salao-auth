"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";

export default function Navbar() {
  const {
    user,
    googleSignIn,
    githubSignIn,
    signUpWithEmail,
    signInWithEmail,
    resetPassword,
    logOut,
  } = UserAuth();

  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (e) {
      console.error(e);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await githubSignIn();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (e) {
      console.error(e);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "signup") {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
      setEmail("");
      setPassword("");
    } catch (e) {
      console.error(e);
      alert(e.message || "Authentication error");
    }
  };

  const handleResetPassword = async () => {
    if (!email) return alert("Please enter your email to reset password");
    try {
      await resetPassword(email);
      alert("Password reset email sent");
    } catch (e) {
      console.error(e);
      alert(e.message || "Reset error");
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <header className="h-20 w-full border-b-2 flex items-center p-2">
      <div className="flex-1">
        <nav>
          <ul className="flex">
            <li className="p-2">
              <Link href="/">Home</Link>
            </li>
            <li className="p-2">
              <Link href="/about">About</Link>
            </li>
            {user && (
              <li className="p-2">
                <Link href="/profile">Profile</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>

      <div className="flex-1 flex justify-center">
        {!loading && !user ? (
          <div>
            <Link href="/login" className="p-2 border rounded bg-gray-100 hover:bg-gray-200">Login / Sign up</Link>
          </div>
        ) : (
          !loading && user && (
            <div className="flex items-center gap-4">
              <p>Welcome, {user.displayName}</p>
              <button onClick={handleSignOut} className="p-2 border rounded">
                Sign out
              </button>
            </div>
          )
        )}
      </div>

      <div className="flex-1 flex justify-end" />
    </header>
  );
}
