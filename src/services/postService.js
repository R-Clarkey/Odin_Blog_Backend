import { prisma } from "../config/prisma.js";
import sanitize from "sanitize-html";

export function getAllPosts() {
    return prisma.post.findMany({
        where: {
            published: true
        },
        include: {
            author: {
                select: {
                    name: true
                }
            }
        }
    })
}

export function getAllPostsById(authorId) {
	return prisma.post.findMany({
		where: {
			authorId: authorId,
			published: true
		},
		include: {
			author: {
				select: {
					name: true
				}
			}
		}
	})
}

export function getAllMyPosts(userId) {
    return prisma.post.findMany({
        where: {
            authorId: userId
        },
        include: {
            author: {
                select: {
                    name: true
                }
            }
        }
    })
}

export function getPostById(postId) {
	return prisma.post.findUnique({
		where: {
			id: postId,
		},
		include: {
			author: {
				select: {
					id: true,
					name: true,
				},
			},
			comments: {
				include: {
					author: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			},
		},
	})
}


export function updatePost(postId, data) {
	console.log("data", data)

	const safeData = {
		...data,
		content: typeof data.content === "string" ? sanitize(data.content) : data.content
	}

	console.log("safeData", safeData)

	return prisma.post.update({
		where: { id: postId },
		data: safeData
	})
}

export async function deletePost(postId, user) {
	const post = await prisma.post.findUnique({
		where: {
			id: postId
		}
	})

	if (!post) {
		throw new Error("Post not found")
	}

	if (post.authorId !== user.user.id) {
		throw new Error("Unauthorized")
	}

	return prisma.post.delete({
		where: {
			id: postId
		}
	})
}

export async function createPost({title, content, userId}) {
    const post = await prisma.post.create({
        data: {
            title: title,
            content: content,
            authorId: userId
        }
    })
    console.log(post)
    return post
}