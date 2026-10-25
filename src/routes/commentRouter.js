import { Router } from "express"
import * as commentController from "../controllers/commentController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = Router()

router.get("/posts/:postId/comments", commentController.getCommentsByPost)
router.post("/posts/:postId/comments", authMiddleware, commentController.createComment)
router.get("/comments/:id", commentController.getCommentById)
router.patch("/comments/:id", authMiddleware, commentController.updateComment)
router.delete("/comments/:id", authMiddleware, commentController.deleteComment)

export default router
