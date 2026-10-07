import { verifyToken } from "../config/jwt.js";

export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Missing Token"})
    }

    const token = authHeader.split(" ")[1]

    try {
        const user = verifyToken(token)
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({ error: "Invalid Token"})
    }
}