import express from "express"
import request from "supertest"
import { prisma } from "../../config/prisma.js"
import userRouter from "../../routes/userRouter.js"

const app = express()
app.use(express.json())
app.use("/users", userRouter)

let testUser

beforeEach(async () => {
	await prisma.user.deleteMany()
	await prisma.post.deleteMany()
	await prisma.comment.deleteMany()

	testUser = await prisma.user.create({
		data: {
			name: "Test User",
			email: "test@example.com",
			password: "Test",
			role: "AUTHOR"
		}
	})
});

afterEach(async () => {
	await prisma.user.deleteMany()
	await prisma.post.deleteMany()
	await prisma.comment.deleteMany()
});

afterAll(async () => {
	await prisma.$disconnect()
})

test("Get /users is reachable", async () => {
	await request(app)
		.get("/users")
		.expect(200)
		.expect('Content-Type', /json/)
})

test("Get /users will return all users", async () => {
	const response = await request(app)
		.get("/users")
		.expect(200)
		.expect('Content-Type', /json/)
	
	expect(response.body).toEqual(
		expect.arrayContaining([
			expect.objectContaining({
				id: testUser.id,
				name: "Test User",
				email: "test@example.com"
			})
		])
	)
})

test("Get /authors will return any user with role equal to 'AUTHOR'", async () => {
	const response = await request(app)
		.get("/users/authors")
		.expect(200)
		.expect('Content-Type', /json/)
	
	expect(response.body).toEqual(
		expect.arrayContaining([
			expect.objectContaining({
				role: "AUTHOR"
			})
		])
	)
})
