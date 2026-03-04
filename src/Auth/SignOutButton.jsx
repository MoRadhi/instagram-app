import { signOut } from "firebase/auth";
import { auth } from "../firebase.jsx";

const SignOutButton = () => {
  return (
    <div>
      <button onClick={() => signOut(auth)}>Sign Out</button>
    </div>
  );
};

export default SignOutButton;
