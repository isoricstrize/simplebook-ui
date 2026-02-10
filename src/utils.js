import { redirect } from "react-router-dom"

export function getAccessToken() {
    return localStorage.getItem("accessToken");
}

export function getRefreshToken() {
    return localStorage.getItem("refreshToken");
}

export function setRefreshToken(newRefreshToken) {
    localStorage.setItem("refreshToken", newRefreshToken);
}

export function setAccessToken(newAccessToken) {
    localStorage.setItem("accessToken", newAccessToken);
}

export function getUsername() {
    return localStorage.getItem("username");
}

export function setUsername(newUsername) {
    localStorage.setItem("username", newUsername);
}

export function isAuthorized() {
    return (getUsername() === "Admin")
}

export function clearLocalStorageData() {
    localStorage.clear();
}


export async function requireAuth() {
    const isLoggedIn = getAccessToken();
    
    if (!isLoggedIn) {
        throw redirect("/login")
    }
}
