async function getAllPosts(req, res) {
    res.json("Posts")
}

async function getPostById(req, res) {
    res.json("ID")
}

async function createPost(req, res) {
    res.json("Create")
}

async function updatePost(req, res) {
    res.json("Update")
}

async function deletePost(req, res) {
    res.json("Delete")
}

export {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}