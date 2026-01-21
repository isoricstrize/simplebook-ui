const API_URL = "http://localhost:5041/api";

export async function loginUser(creds) {

    const res = await fetch(`${API_URL}/Auth/login`,{ 
        method: "post", 
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify(creds) 
    })

    let data;
    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
        data = await res.json();
    } else {
        data = await res.text();
    }

    if (!res.ok) {
        const errorMessage = typeof data === "string" 
            ? data 
            : data.message || "Unknown error";
        throw errorMessage;
    }

    return data;
}


export async function registerUser(creds) {
   const res = await fetch(`${API_URL}/Auth/register`,{ 
        method: "post", 
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify(creds) 
    })

    let data;
    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
        data = await res.json();
    } else {
        data = await res.text();
    }

    if (!res.ok) {
        const errorMessage = typeof data === "string" 
            ? data 
            : data.message || "Unknown error";
        throw errorMessage;
    }

    return data; 
}


export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");

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
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
}


export async function getBooks() {
    let token = localStorage.getItem("accessToken");

   let res = await fetch(`${API_URL}/Book`,{ 
        method: "GET", 
        headers: {
      Authorization: `Bearer ${token}`,
    },
    })

    if (res.status === 401) {
        try {
            await refreshAccessToken();
        } catch {
            localStorage.clear();
            throw new Error("Session expired. Please log in again.");
        }

        // retry request
        token = localStorage.getItem("accessToken");
        res = await fetch(`${API_URL}/Book`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
    }
  

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  return await res.json();
}