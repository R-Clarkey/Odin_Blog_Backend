import dotenv from "dotenv"
import path from "node:path"
import { fileURLToPath } from "node:url"
import express from "express"
import cors from "cors";

import commentRouter from "./routes/commentRouter.js"
import postRouter from "./routes/postRouter.js"
import userRouter from "./routes/userRouter.js"
import authRouter from "./routes/authRouter.js"

if (process.env.NODE_ENV !== "production") {
  dotenv.config()
}

const app = express()
app.use(express.json());

const allowedOrigins = process.env.CORS_ORIGINS.split(",")
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

app.use("/users", userRouter)
app.use("/", commentRouter)
app.use("/posts", postRouter)
app.use("/auth", authRouter)

export default app