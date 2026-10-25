import * as commentService from "../services/commentService.js"

async function getCommentsByPost(req, res) {
	res.json("Comments")
}

async function createComment(req, res) {
	try {
		const postId = Number(req.params.postId)
		const userId = req.user.user.id
		const { comment } = req.body

		const createdComment = await commentService.createComment(comment, postId, userId)

		res.status(201).json(createdComment)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}


async function getCommentById(req, res) {
	res.json("By ID")
}

async function updateComment(req, res) {
	res.json("Update")
}

async function deleteComment(req, res) {
	res.json("Delete")
}

export {
	getCommentsByPost,
	createComment,
	getCommentById,
	updateComment,
	deleteComment
}
