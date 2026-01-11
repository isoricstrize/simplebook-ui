import "../styles/Home.css";
import { Link, NavLink } from "react-router-dom";

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
          to="login"
          className={({ isActive }) =>
            `login-link ${isActive ? "login-active" : ""}`
          }
        >
          <img src="src/assets/avatar-icon.svg" className="login-icon" />
        </NavLink>
      </nav>
    </header>
  );
}
