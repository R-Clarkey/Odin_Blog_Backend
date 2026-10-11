import { prisma } from "../config/prisma.js";
import sanitize from "sanitize-html";

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
            comments: true,    
        },  
    });}

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

