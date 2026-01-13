import "../styles/Login.css";
import React from "react";
import { useLoaderData, Form, redirect, useActionData } from "react-router-dom";
import { loginUser } from "../api";

export async function action({ request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  try {
    const data = await loginUser({ username, password });
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
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
      {errorMessage && <h3 className="login-error">{errorMessage}</h3>}

      <Form method="post" className="login-form" replace>
        <input name="username" type="text" placeholder="Username" />
        <input name="password" type="password" placeholder="Password" />
        <button>Log in</button>
      </Form>
    </div>
  );
}

export default Login;
