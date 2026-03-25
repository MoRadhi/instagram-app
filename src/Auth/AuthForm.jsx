import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, database } from "../firebase.jsx";
import { useState } from "react";
import { ref, set } from "firebase/database";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };
  const handleSignUp = async () => {
    setError("");
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const uid = credential.user.uid;
      // Store name in Firebase Realtime Database under users/{uid}/name
      await set(ref(database, `users/${uid}/name`), name.trim());
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <h1 className="auth-title">{isNewUser ? "Sign Up" : "Sign In"}</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className="auth-input"
          type="name"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isNewUser ? (
          <button className="auth-btn-primary" onClick={handleSignUp}>
            Create Account
          </button>
        ) : (
          <button className="auth-btn-primary" onClick={handleSignIn}>
            Sign In
          </button>
        )}
      </form>
      <button
        className="auth-btn-secondary"
        onClick={() => setIsNewUser(!isNewUser)}
      >
        {isNewUser ? "Already have an account? Sign In" : "New user? Sign Up"}
      </button>
      {error && <p className="auth-error">{error}</p>}
    </div>
  );
};

export default AuthForm;
