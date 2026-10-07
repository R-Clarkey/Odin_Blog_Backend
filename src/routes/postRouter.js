import { Router } from "express"
import * as postController from "../controllers/postController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = Router()

router.get("/", postController.getAllPosts)
router.get("/me", authMiddleware, postController.getAllMyPosts)
router.get("/:id", postController.getPostById)
router.post("/", authMiddleware, postController.createPost)
router.patch("/:id", authMiddleware, postController.updatePost)
router.delete("/:id", authMiddleware, postController.deletePost)

export default router
