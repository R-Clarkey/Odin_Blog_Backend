import * as postService from "../services/postService.js"

async function getAllPosts(req, res) {
    res.json("All")
}

async function getAllMyPosts(req, res) {
    const posts = await postService.getAllMyPosts(req.user.user.id)
    res.json(posts)
}

async function getPostById(req, res) {
    const postId = Number(req.params.id)
    const post = await postService.getPostById(postId)
    res.json(post)
}

async function createPost(req, res) {
    res.json("Create")
}

async function updatePost(req, res) {
    const postId = Number(req.params.id)
    const { bodyData } = req.body

    const updatedPost = await postService.updatePost(postId, { bodyData })
    res.json(updatedPost)
}

async function deletePost(req, res) {
    res.json("Delete")
}

export {
    getAllPosts,
    getAllMyPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,

}