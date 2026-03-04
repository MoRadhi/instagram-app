import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase.jsx";
import { useState } from "react";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    try {
      await createUserWithEmailAndPassword(auth, email, password);
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
