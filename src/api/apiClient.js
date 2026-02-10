import { getAccessToken, clearLocalStorageData } from "../utils";

const API_URL = "http://localhost:5041/api";

export async function apiFetch(endpoint, options = {}) {
  const token = getAccessToken();

  const config = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    },
    body: options.body ? JSON.stringify(options.body) : null
  };

  const res = await fetch(`${API_URL}${endpoint}`, config);

  if (res.status === 401) {
    try {
        await refreshAccessToken();
    } catch {
        clearLocalStorageData();
        throw new Error("Session expired. Please log in again.");
    }

    // retry request
    token = getAccessToken();
    config = {
        method: options.method || "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers
        },
        body: options.body ? JSON.stringify(options.body) : null
    };
  }

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
}


export async function refreshAccessToken() {
  const refreshToken = getRefreshToken();

  const res = await fetch(`${API_URL}/Auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    throw new Error("Refresh failed");
  }

  const data = await res.json();
  setAccessToken(data.accessToken);
  setRefreshToken(data.refreshToken);
}
