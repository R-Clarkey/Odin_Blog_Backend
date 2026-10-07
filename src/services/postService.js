import { prisma } from "../config/prisma.js";

export function getAllPosts() {
    return prisma.post.findMany()
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

export function updatePost(postId, data) {
    return prisma.post.update({
        where: { id: postId },
        data
    })
}