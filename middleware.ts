export {default } from "next-auth/middleware";

export const config = {
    // protected routes
    matcher: [
        "/trips",
        "/reservations",
        "/properties",
        "/favorites",
    ]
}