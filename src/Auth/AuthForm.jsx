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

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <h1>{isNewUser ? "Sign Up" : "Sign In"}</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Enter Your Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Enter Your Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {isNewUser ? (
          <button onClick={handleSignUp}>Create Account</button>
        ) : (
          <button onClick={handleSignIn}>Sign In</button>
        )}
      </form>
      <br />
      <button onClick={() => setIsNewUser(!isNewUser)}>
        {isNewUser ? "Already have an account" : "New user? Sign Up"}
      </button>
    </div>
  );
};

export default AuthForm;
