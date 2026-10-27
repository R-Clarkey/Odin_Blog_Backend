import { Router } from "express"
import * as userController from "../controllers/userController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
const router = Router()

router.get("/", userController.getAllUsers)
router.post("/become-author", authMiddleware, userController.postBecomeAuthor)
router.get("/authors", userController.getAllAuthors)

export default router
