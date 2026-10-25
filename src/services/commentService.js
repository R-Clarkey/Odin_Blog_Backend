import { prisma } from "../config/prisma.js"

export async function createComment(comment, postId, userId) {
	const post = await prisma.post.findUnique({
		where: {
			id: postId
		}
	})

	if (!post) {
		throw new Error("Post not found")
	}

	return prisma.comment.create({
		data: {
			content: comment,
			postId,
			authorId: userId
		},
		include: {
			author: {
				select: {
					id: true,
					name: true
				}
			}
		}
	})
}
