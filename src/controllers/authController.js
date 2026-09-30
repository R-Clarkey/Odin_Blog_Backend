import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma.js";
import { signToken } from "../config/jwt.js";

async function register (req, res) {
    const {name, email, password} = req.body
    const existingUser = await prisma.user.findUnique({where: { email }})
    if (existingUser) {
        return res.status(400).json({message: "Email already exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
        data: { name, email, password: hashedPassword}
    })

    const token = signToken({token, user: {id: user.id, name: user.name, email: user.email}})
    res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } })
}

async function login (req, res) {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({ where: { email}})
    if (!user) {
        return res.status(401).json({ message: "Invalid Credentials"})
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid Credentials"})
    }

    const token = signToken({ id: user.id, name: user.name, email: user.email, role: user.role})

    res.json(token)
}

export {
    register,
    login
}