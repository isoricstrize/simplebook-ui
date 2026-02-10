import "../styles/Home.css";
import { Link, NavLink } from "react-router-dom";
import avatarIcon from "../assets/avatar-icon.svg";

export default function Header() {
  const activeStyles = {
    fontWeight: "bold",
    color: "black",
    transform: "scale(1.08)",
  };

  return (
    <header>
      <Link to="/">
        <img src="../../public/books.svg" className="site-logo" />
      </Link>
      <nav>
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Home
        </NavLink>
        <NavLink
          to="books"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Books
        </NavLink>
        <NavLink
          to="profile"
          className={({ isActive }) =>
            `login-link ${isActive ? "login-active" : ""}`
          }
        >
          <img src={avatarIcon} className="login-icon" />
        </NavLink>
      </nav>
    </header>
  );
}
