import bcrypt from "bcryptjs"
import { prisma } from "../config/prisma.js"
import { signToken } from "../config/jwt.js"

function publicUser(user) {
	return {
		id: user.id,
		name: user.name,
		email: user.email
	}
}

async function register(req, res) {
	try {
		const { name, email, password } = req.body

		if (
			typeof name !== "string" ||
			typeof email !== "string" ||
			typeof password !== "string" ||
			!name.trim() ||
			!email.trim() ||
			!password
		) {
			return res.status(400).json({
				message: "Name, email, and password are required"
			})
		}

		const normalizedEmail = email.trim().toLowerCase()
		const existingUser = await prisma.user.findUnique({
			where: { email: normalizedEmail }
		})

		if (existingUser) {
			return res.status(409).json({ message: "Email already exists" })
		}

		const hashedPassword = await bcrypt.hash(password, 10)
		const user = await prisma.user.create({
			data: {
				name: name.trim(),
				email: normalizedEmail,
				password: hashedPassword
			}
		})

		const responseUser = publicUser(user)
		const token = signToken({ user: responseUser })

		return res.status(201).json({ token, user: responseUser })
	} catch (error) {
		console.error("Registration error:", error)
		return res.status(500).json({ message: "Unable to register" })
	}
}

async function login(req, res) {
	try {
		const { email, password } = req.body

		if (typeof email !== "string" || typeof password !== "string") {
			return res.status(400).json({
				message: "Email and password are required"
			})
		}

		const normalizedEmail = email.trim().toLowerCase()
		const user = await prisma.user.findUnique({
			where: { email: normalizedEmail }
		})

		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ message: "Invalid credentials" })
		}

		const responseUser = publicUser(user)
		const token = signToken({ user: responseUser })

		return res.json({ token, user: responseUser })
	} catch (error) {
		console.error("Login error:", error)
		return res.status(500).json({ message: "Unable to log in" })
	}
}

export { register, login }
