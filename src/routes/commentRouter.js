import { Router } from "express"
import * as commentController from "../controllers/commentController.js"

const router = Router()

router.get("/posts/:postId/comments", commentController.getCommentsByPost)
router.post("/posts/:postId/comments", commentController.createComment)
router.get("/comments/:id", commentController.getCommentById)
router.patch("/comments/:id", commentController.updateComment)
router.delete("/comments/:id", commentController.deleteComment)

export default router
