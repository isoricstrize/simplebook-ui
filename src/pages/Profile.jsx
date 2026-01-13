import "../styles/Home.css";
import { requireAuth } from "../utils";
import { redirect, useNavigate } from "react-router-dom";

export async function loader() {
  await requireAuth();
  return "This is ok.";
}

function Profile() {
  const navigate = useNavigate();

  function fakeLogOut() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  }

  return (
    <>
      <h1>This is Profile page.</h1>

      <button onClick={fakeLogOut}>X</button>
    </>
  );
}

export default Profile;
