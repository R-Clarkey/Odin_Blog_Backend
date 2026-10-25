import { prisma } from "../config/prisma.js"

export function getAllUsers() {
	return prisma.user.findMany()
}

export async function getAllAuthors() {
	const authors = await prisma.user.findMany({
		where: {
			role: "AUTHOR"
		},
		select: {
			id: true,
			name: true,
			role: true,
			posts: {
				where: {
					published: true
				},
				select: {
					id: true
				}
			}
		}
	})

	return authors.map((author) => ({
		...author,
		publishedPostCount: author.posts.length
	}))
}

export async function postBecomeAuthor(userId, password) {
	console.log("Become author service reached")
	const user = await prisma.user.findUnique({ where: { id: userId } })

	if (!user) {
		throw new Error("User not found")
	}

	if (password !== process.env.AUTHOR_PASSWORD) {
		throw new Error("Incorrect password")
	}

	return prisma.user.update({
		where: { id: userId },
		data: { role: "AUTHOR" }
	})
}