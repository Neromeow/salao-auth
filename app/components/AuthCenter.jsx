"use client";
import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";

export default function AuthCenter() {
  const { user, googleSignIn, githubSignIn, signUpWithEmail, signInWithEmail, resetPassword, logOut } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");

  const handleGoogle = async () => {
    try {
      await googleSignIn();
    } catch (e) {
      console.error(e);
      alert(e.message || "Google sign-in failed");
    }
  };

  const handleGithub = async () => {
    try {
      await githubSignIn();
    } catch (e) {
      console.error(e);
      alert(e.message || "GitHub sign-in failed");
    }
  };

  const handleSubmit = async (e) => {
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

  const handleReset = async () => {
    if (!email) return alert("Enter email to reset password");
    try {
      await resetPassword(email);
      alert("Password reset sent");
    } catch (e) {
      console.error(e);
      alert(e.message || "Reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-6 border rounded shadow-sm">
        {!user ? (
          <div className="space-y-4">
            <h2 className="text-center text-xl font-semibold">Welcome</h2>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleGoogle}
                aria-label="Sign in with Google"
                className="flex items-center gap-3 px-4 py-2 border rounded bg-white hover:bg-gray-50"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M17.64 9.2045c0-.638-.0573-1.2525-.1636-1.842H9v3.486h4.844c-.2084 1.125-1.333 3.294-4.681 3.294-2.814 0-5.102-2.323-5.102-5.178S6.349 3.786 9.162 3.786c1.603 0 2.677.688 3.294 1.269l2.246-2.16C13.96 1.26 11.78.24 9.162.24 4.945.24 1.62 3.768 1.62 7.99s3.325 7.75 7.542 7.75c4.334 0 7.395-3.038 7.395-6.536z" fill="#4285F4"/>
                </svg>
                <span className="text-sm text-black">Sign in with Google</span>
              </button>

              <button
                onClick={handleGithub}
                aria-label="Sign in with GitHub"
                className="flex items-center gap-3 px-4 py-2 bg-black text-white rounded hover:opacity-90"
              >
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path fillRule="evenodd" clipRule="evenodd" d="M8 .198a8 8 0 00-2.53 15.59c.4.074.547-.174.547-.388 0-.192-.007-.699-.01-1.373-2.226.484-2.695-1.07-2.695-1.07-.364-.924-.89-1.17-.89-1.17-.727-.497.055-.487.055-.487.803.057 1.225.825 1.225.825.714 1.223 1.873.87 2.33.666.072-.518.279-.87.507-1.07-1.777-.202-3.644-.888-3.644-3.95 0-.873.312-1.586.824-2.146-.083-.203-.357-1.02.078-2.125 0 0 .672-.215 2.2.82a7.66 7.66 0 012.003-.27c.68.003 1.366.093 2.003.27 1.526-1.035 2.197-.82 2.197-.82.437 1.105.163 1.922.08 2.125.513.56.823 1.273.823 2.146 0 3.073-1.87 3.744-3.652 3.944.286.246.54.73.54 1.473 0 1.063-.01 1.922-.01 2.183 0 .215.144.466.55.387A8 8 0 008 .197z" fill="#fff"/>
                </svg>
                <span className="text-sm">Sign in with GitHub</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded w-full text-black"
                required
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 rounded w-full text-black"
                required
              />

              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-blue-600 text-black p-2 rounded">
                  {mode === "signup" ? "Sign up" : "Login"}
                </button>
                <button type="button" onClick={() => setMode(mode === "signup" ? "login" : "signup")} className="p-2 border rounded text-black">
                  {mode === "signup" ? "Switch to login" : "Switch to sign up"}
                </button>
              </div>

              <div className="flex justify-between items-center">
                <button type="button" onClick={handleReset} className="text-sm text-blue-600">Reset password</button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center">
            <p className="mb-4">Signed in as {user.displayName || user.email}</p>
            <div className="flex justify-center gap-2">
              <button onClick={async () => { try { await logOut(); } catch(e){console.error(e);} }} className="p-2 border rounded">Sign out</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
