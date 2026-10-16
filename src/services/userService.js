import { prisma } from "../config/prisma.js";

export function getAllUsers() {
    return prisma.user.findMany()
}

export function getAllAuthors() {

}