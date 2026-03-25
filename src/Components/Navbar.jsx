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
      <NavLink
        className={({ isActive }) =>
          isActive ? "navbar-link active" : "navbar-link"
        }
        to="/create-post"
      >
        <span className="navbar-icon">+</span>
        <span>Create Post</span>
      </NavLink>
      {user && (
        <div className="navbar-user">
          <span className="navbar-user-name">👤 {user.name}</span>
          <SignOutButton />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
