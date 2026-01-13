import { redirect } from "react-router-dom"

export async function requireAuth() {
    const isLoggedIn = localStorage.getItem("accessToken")
    
    if (!isLoggedIn) {
        throw redirect("/login?message=You must log in first.") // get from loaderData this message!
    }
}