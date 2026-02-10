import "../styles/Login.css";
import React from "react";
import {
  useLoaderData,
  Form,
  redirect,
  useActionData,
  Link,
} from "react-router-dom";
import { loginUser } from "../api/authApi";
import { setAccessToken, setRefreshToken, setUsername } from "../utils";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  try {
    const data = await loginUser({ username, password });
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
    setUsername(username);
    return redirect("/profile");
  } catch (err) {
    return err;
  }
}

function Login() {
  const errorMessage = useActionData();
  const message = useLoaderData();

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="login-success">{message}</h3>}
      {errorMessage && <h3 className="login-error">{errorMessage}</h3>}

      <Form method="post" className="login-form" replace>
        <input name="username" type="text" placeholder="Username" />
        <input name="password" type="password" placeholder="Password" />
        <button>Log in</button>
      </Form>

      <p className="auth-switch">
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
