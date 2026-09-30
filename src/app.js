import dotenv from "dotenv"
import path from "node:path"
import { fileURLToPath } from "node:url"
import express from "express"

import commentRouter from "./routes/commentRouter.js"
import postRouter from "./routes/postRouter.js"
import userRouter from "./routes/userRouter.js"
import authRouter from "./routes/authRouter.js"

const app = express()
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  dotenv.config()
}

app.use("/users", userRouter)
app.use("/", commentRouter)
app.use("/posts", postRouter)
app.use("/auth", authRouter)

export default app