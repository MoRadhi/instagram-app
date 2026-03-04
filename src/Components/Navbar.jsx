import { NavLink } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";
import SignOutButton from "../Auth/SignOutButton";

const Navbar = () => {
  const user = useAuth();

  return (
    <nav className="navbar">
      <NavLink
        className={({ isActive }) =>
          isActive ? "navbar-link active" : "navbar-link"
        }
        to="/"
        end
      >
        <span className="navbar-icon">⌂</span>
        <span>Home</span>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "navbar-link active" : "navbar-link"
        }
        to="/news-feed"
      >
        <span className="navbar-icon">◉</span>
        <span>News Feed</span>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "navbar-link active" : "navbar-link"
        }
        to="/chat"
      >
        <span className="navbar-icon">✉</span>
        <span>Chat</span>
      </NavLink>
      {user && <SignOutButton />}
    </nav>
  );
};

export default Navbar;
