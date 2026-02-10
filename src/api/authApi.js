import { apiFetch } from "./apiClient";

 export function loginUser(credentials) {
  return apiFetch("/Auth/login", {
    method: "POST",
    body: credentials
  });
}

export function registerUser(credentials) {
  return apiFetch("/Auth/register", {
    method: "POST",
    body: credentials
  });
}