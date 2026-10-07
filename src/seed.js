import { PrismaClient } from "../generated/prisma/index.js"
import { prisma } from "./config/prisma.js"

async function main() {
	const authorEmail = "test@test.com"

	const author = await prisma.user.findUnique({
		where: { email: authorEmail },
	})

	if (!author) {
		throw new Error(
			`No user found with email "${authorEmail}". Create that user first or change authorEmail in this script.`,
		)
	}

	const posts = [
		{
			title: "A Simple Guide to Growing Herbs Indoors",
			content:
				"Start with herbs that do well in pots, such as basil, mint, and parsley. Place them near a sunny window, use containers with drainage holes, and water when the top of the soil feels dry. Rotate the pots every few days so each plant gets even light.",
			published: true,
		},
		{
			title: "What I Learned from Building a Small Side Project",
			content:
				"Keeping the first version small made it much easier to finish. I focused on one useful feature, asked a few people to try it, and used their feedback to decide what to build next. The biggest lesson: a working, simple project is more valuable than a perfect idea that never ships.",
			published: true,
		},
		{
			title: "Weekend Reading List",
			content:
				"I’m setting aside some time this weekend to read about accessible design, better writing habits, and how people build sustainable routines. If you have a favorite book or article on any of those topics, share it in the comments.",
			published: false,
		},
	]

	for (const post of posts) {
		await prisma.post.create({
			data: {
				...post,
				authorId: author.id,
			},
		})
	}

	console.log(`Created ${posts.length} posts for ${author.name}.`)
}

main()
	.catch((error) => {
		console.error("Failed to seed posts:", error)
		process.exitCode = 1
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
