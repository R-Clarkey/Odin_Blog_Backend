import dotenv from "dotenv";
import app from "./app.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config()
}

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Listening on http://127.0.0.1:${PORT}`))
