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

    return data; // success data
}


export async function getBooks(id) {
   

    return 
}