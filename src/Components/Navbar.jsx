import { Link } from "react-router-dom";
import SignOutButton from "../Auth/SignOutButton";
import { useAuth } from "../Auth/AuthProvider";

const Navbar = () => {
  const user = useAuth();

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="news-feed">News Feed</Link>
      <Link to="chat">Chat</Link>
      {user && <SignOutButton />}
    </div>
  );
};

export default Navbar;
