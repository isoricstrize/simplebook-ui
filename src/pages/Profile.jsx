import "../styles/Profile.css";
import { redirect, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    navigate("/login");
  }

  return (
    <div className="profile-container">
      <img
        src="src/assets/avatar-icon.svg"
        alt="Profile"
        className="profile-image"
      />

      <h2 className="profile-username">{username}</h2>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;
