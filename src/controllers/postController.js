import * as postService from "../services/postService.js"

async function getAllPosts(req, res) {
    res.json("All")
}

async function getAllMyPosts(req, res) {
    console.log("USER ID",req.user.user.id)
    const posts = await postService.getAllMyPosts(req.user.user.id)
    console.log(posts)
    res.json(posts)
}

async function getPostById(req, res) {
    const post = await postService.getPostById(Number(req.params.id))
    console.log(post)
    res.json(post)
}

async function createPost(req, res) {
    res.json("Create")
}

async function updatePost(req, res) {
    console.log("Testing")
    console.log("PATCH hit", req.params.id)
    const postId = Number(req.params.id)
    const { published } = req.body

    const updatedPost = await postService.updatePost(postId, { published })
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