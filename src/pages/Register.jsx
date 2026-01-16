import "../styles/Login.css";
import React from "react";
import { Form, redirect, useActionData, Link } from "react-router-dom";
import { registerUser } from "../api";

export async function action({ request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  try {
    await registerUser({ username, password });
    return redirect("/login?message=Registration successful. Please log in.");
  } catch (err) {
    return err;
  }
}

function Register() {
  const errorMessage = useActionData();

  return (
    <div className="login-container">
      <h1>Create an account</h1>

      {errorMessage && <h3 className="login-error">{errorMessage}</h3>}

      <Form method="post" className="login-form" replace>
        <input name="username" type="text" placeholder="Username" required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          required
        />
        <button>Register</button>
      </Form>

      <p className="auth-switch">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
