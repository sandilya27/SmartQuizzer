/**
 * An array of routes that are accesible to the public
 * These route do not require authentication
 * @types {string[]}
 */
export const publicRoutes = [
    "/",
    "/auth/new-verification"
]

/**
 * An array of routes that are used for authentication
 * These route redirect logged in users to /dashboard
 * @types {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error"
]

/**
 * The prefix for API authentication routes
 * Routes that are start with this prefix are used for API
 * @types {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @types {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";