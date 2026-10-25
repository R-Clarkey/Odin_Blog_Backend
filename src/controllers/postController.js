import * as postService from "../services/postService.js"

async function getAllPosts(req, res) {
    const posts = await postService.getAllPosts()
    res.json(posts)
}

async function getAllPostsById(req, res) {
    const authorId = Number(req.params.id)
    const posts = await postService.getAllPostsById(authorId)
    res.json(posts)
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
    const userId = req.user.user.id
    const { title, content } = req.body
    const post = await postService.createPost({title, content, userId})
	res.status(201).json(post)
}

async function updatePost(req, res) {
    const postId = Number(req.params.id)
    const updatedPost = await postService.updatePost(postId, req.body)
    res.json(updatedPost)
}

async function deletePost(req, res) {
    const postId = Number(req.params.id)
    const deletedPost = await postService.deletePost(postId, req.user)
    res.json(deletedPost)
}

export {
    getAllPosts,
    getAllPostsById,
    getAllMyPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,

}